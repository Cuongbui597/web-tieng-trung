import { NextRequest, NextResponse } from 'next/server';
import { getClientMeta, isBodyTooLarge, isValidEmail, sanitizeText } from '@/lib/apiGuards';
import { rateLimit } from '@/lib/rateLimit';
import { ensureDbReady, sql } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        if (isBodyTooLarge(request, 50_000)) {
            return NextResponse.json({ ok: false, error: 'Nội dung quá lớn' }, { status: 413 });
        }

        const { ip, userAgent } = getClientMeta(request);
        const rl = rateLimit({
            key: `contact:${ip || 'unknown'}`,
            limit: 5,
            windowMs: 10 * 60 * 1000,
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

        const name = sanitizeText(body?.name, { min: 2, max: 80 });
        const email = sanitizeText(body?.email, { min: 5, max: 200 }).toLowerCase();
        const phone = sanitizeText(body?.phone, { max: 30 });
        const subject = sanitizeText(body?.subject, { min: 3, max: 120 });
        const message = sanitizeText(body?.message, { min: 10, max: 4000, allowNewlines: true, collapseWhitespace: false });

        if (!name) {
            return NextResponse.json({ ok: false, error: 'Tên không hợp lệ' }, { status: 400 });
        }
        if (!email || !isValidEmail(email)) {
            return NextResponse.json({ ok: false, error: 'Email không hợp lệ' }, { status: 400 });
        }
        if (phone && !/^[0-9]{10,11}$/.test(phone.replace(/\s/g, ''))) {
            return NextResponse.json({ ok: false, error: 'Số điện thoại không hợp lệ' }, { status: 400 });
        }
        if (!subject) {
            return NextResponse.json({ ok: false, error: 'Chủ đề không hợp lệ' }, { status: 400 });
        }
        if (!message) {
            return NextResponse.json({ ok: false, error: 'Nội dung tin nhắn quá ngắn' }, { status: 400 });
        }

        try {
            await ensureDbReady();
            await sql`
        insert into contacts (name, email, phone, subject, message, ip, user_agent)
        values (${name}, ${email}, ${phone || null}, ${subject}, ${message}, ${ip || null}, ${userAgent || null});
      `;
        } catch (err) {
            console.error('Contact DB insert error:', err);
            return NextResponse.json(
                { ok: false, error: 'Không lưu được liên hệ. Vui lòng thử lại sau.' },
                { status: 502 },
            );
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('POST /api/contact error:', error);
        return NextResponse.json({ ok: false, error: 'Server error' }, { status: 500 });
    }
}
