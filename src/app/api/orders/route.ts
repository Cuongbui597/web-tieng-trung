import { NextRequest, NextResponse } from 'next/server';
import { getClientMeta, isBodyTooLarge, sanitizeText } from '@/lib/apiGuards';
import { rateLimit } from '@/lib/rateLimit';
import { randomUUID } from 'crypto';
import { ensureDbReady, sql } from '@/lib/db';
import { sendOrderEmail } from '@/lib/email';

function parseVnd(value: unknown): number {
    if (typeof value === 'number' && Number.isFinite(value)) return Math.round(value);
    const str = String(value ?? '');
    const digits = str.replace(/[^0-9]/g, '');
    if (!digits) return 0;
    return Number.parseInt(digits, 10) || 0;
}

export async function POST(request: NextRequest) {
    try {
        if (isBodyTooLarge(request, 100_000)) {
            return NextResponse.json({ ok: false, error: 'Nội dung quá lớn' }, { status: 413 });
        }

        const { ip } = getClientMeta(request);
        const rl = rateLimit({
            key: `orders:${ip || 'unknown'}`,
            limit: 8,
            windowMs: 60 * 60 * 1000,
        });
        if (!rl.ok) {
            return NextResponse.json(
                { ok: false, error: 'Bạn gửi quá nhiều. Vui lòng thử lại sau.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(rl.retryAfterSeconds) },
                },
            );
        }

        const body = await request.json();

        // Honeypot (optional). If filled => silently accept but do not store.
        const hp = sanitizeText(body?.website ?? body?.company ?? '', { max: 200 });
        if (hp) {
            return NextResponse.json({ ok: true });
        }

        const customer = body?.customer || {};
        const name = sanitizeText(customer?.name, { min: 2, max: 80 });
        const phone = sanitizeText(customer?.phone, { min: 9, max: 30 });
        const address = sanitizeText(customer?.address, { min: 5, max: 300, allowNewlines: true, collapseWhitespace: false });
        const note = sanitizeText(customer?.note, { max: 500, allowNewlines: true, collapseWhitespace: false });
        const payment = String(customer?.payment ?? 'cod').trim();

        const items = Array.isArray(body?.items) ? body.items : [];

        if (!name) {
            return NextResponse.json({ ok: false, error: 'Tên không hợp lệ' }, { status: 400 });
        }
        if (!/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''))) {
            return NextResponse.json({ ok: false, error: 'Số điện thoại không hợp lệ' }, { status: 400 });
        }
        if (!address) {
            return NextResponse.json({ ok: false, error: 'Địa chỉ không hợp lệ' }, { status: 400 });
        }
        if (!['cod', 'transfer'].includes(payment)) {
            return NextResponse.json({ ok: false, error: 'Phương thức thanh toán không hợp lệ' }, { status: 400 });
        }
        if (items.length === 0) {
            return NextResponse.json({ ok: false, error: 'Giỏ hàng trống' }, { status: 400 });
        }
        if (items.length > 50) {
            return NextResponse.json({ ok: false, error: 'Quá nhiều sản phẩm trong giỏ hàng' }, { status: 400 });
        }

        const normalizedItems = items
            .map((item: any) => {
                const title = sanitizeText(item?.title, { min: 1, max: 150 });
                const slug = item?.slug ? String(item.slug).trim() : null;
                const quantity = Number(item?.quantity ?? 0);
                const unitPrice =
                    typeof item?.unitPrice === 'number' ? Math.round(item.unitPrice) : parseVnd(item?.price);

                const safeQuantity = Number.isFinite(quantity) ? Math.max(1, Math.min(50, Math.floor(quantity))) : 1;
                const safeUnitPrice = Number.isFinite(unitPrice) ? Math.max(0, unitPrice) : 0;

                return {
                    title,
                    slug,
                    quantity: safeQuantity,
                    unitPrice: safeUnitPrice,
                    lineTotal: safeUnitPrice * safeQuantity,
                };
            })
            .filter((i: any) => i.title && i.quantity > 0);

        if (normalizedItems.length === 0) {
            return NextResponse.json({ ok: false, error: 'Sản phẩm không hợp lệ' }, { status: 400 });
        }

        const subtotal = normalizedItems.reduce((sum: number, i: any) => sum + i.lineTotal, 0);
        const shipping = 0;
        const total = subtotal + shipping;

        const orderId = `order_${randomUUID()}`;

        // --- DB SAVE (Best effort) ---
        try {
            await ensureDbReady();
            await sql`
        insert into orders (
          order_id, name, phone, address, note, payment,
          subtotal, shipping, total, items, ip
        )
        values (
          ${orderId}, ${name}, ${phone}, ${address}, ${note || null}, ${payment},
          ${subtotal}, ${shipping}, ${total}, ${JSON.stringify(normalizedItems)}, ${ip || null}
        );
      `;
        } catch (err) {
            console.warn('Order DB insert error (ignoring for email sent):', err);
            // Don't fail the request if DB fails, as long as we can send email or at least return success to user.
            // But logging is important.
        }

        // --- EMAIL SEND (Best effort, but critical for Admin) ---
        // Await to ensure Vercel/Serverless function doesn't freeze before sending.
        try {
            await sendOrderEmail({
                orderId,
                name,
                phone,
                address,
                items: normalizedItems,
                total,
            });
        } catch (err) {
            console.error('Email send failed:', err);
        }

        return NextResponse.json({ ok: true, orderId });
    } catch (error) {
        console.error('POST /api/orders error:', error);
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
    }
}
