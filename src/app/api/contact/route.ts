import { NextRequest, NextResponse } from 'next/server';
import { getClientMeta, isBodyTooLarge, isValidEmail, sanitizeText } from '@/lib/apiGuards';
import { rateLimit } from '@/lib/rateLimit';
import { ensureDbReady, sql } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        if (isBodyTooLarge(request, 100_000)) {
            return NextResponse.json({ ok: false, error: 'Nội dung quá lớn' }, { status: 413 });
        }

        const { ip, userAgent } = getClientMeta(request);
        const rl = rateLimit({
            key: `contact:${ip || 'unknown'}`,
            limit: 20, // Cho phép học viên thử lại thoải mái hơn
            windowMs: 10 * 60 * 1000,
        });
        if (!rl.ok) {
            return NextResponse.json(
                { ok: false, error: 'Bạn đã gửi nhiều lần. Vui lòng đợi ít phút hoặc gọi Hotline trực tiếp.' },
                {
                    status: 429,
                    headers: { 'Retry-After': String(rl.retryAfterSeconds) },
                },
            );
        }

        const contentType = request.headers.get('content-type') || '';
        let body: Record<string, any> = {};
        const isFormData = contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data');

        if (isFormData) {
            const formData = await request.formData();
            formData.forEach((value, key) => {
                body[key] = typeof value === 'string' ? value : '';
            });
        } else {
            try {
                body = await request.json();
            } catch {
                body = {};
            }
        }

        // Honeypot spam protection
        const hp = sanitizeText(body?.website ?? body?.company ?? '', { max: 200 });
        if (hp) {
            return NextResponse.json({ ok: true, message: 'Gửi thành công!' });
        }

        const name = sanitizeText(body?.name, { min: 2, max: 80 });
        const phone = sanitizeText(body?.phone, { max: 30 });
        let email = sanitizeText(body?.email, { max: 200 }).toLowerCase();
        const course = sanitizeText(body?.course, { max: 120 });
        const studyMode = sanitizeText(body?.study_mode, { max: 80 });
        const timeSlot = sanitizeText(body?.time_slot, { max: 80 });
        let userMessage = sanitizeText(body?.message, { max: 4000, allowNewlines: true, collapseWhitespace: false });
        let subject = sanitizeText(body?.subject, { max: 150 }) || 'Đăng ký khóa học tiếng Trung mới';

        if (!name) {
            return NextResponse.json({ ok: false, error: 'Vui lòng nhập họ và tên của bạn' }, { status: 400 });
        }

        // Kiểm tra số điện thoại (phải có ít nhất 9-12 số)
        const cleanPhone = phone ? phone.replace(/[\s.-]/g, '') : '';
        if (!cleanPhone || cleanPhone.length < 9) {
            return NextResponse.json({ ok: false, error: 'Vui lòng cung cấp số điện thoại hoặc Zalo hợp lệ để trung tâm liên hệ' }, { status: 400 });
        }

        // Nếu học viên không nhập email, tự động gán email đại diện hợp lệ để lưu trữ
        if (!email || !isValidEmail(email)) {
            email = `hocvien_${cleanPhone}@tiengtrunghsk.vn`;
        }

        // Tạo nội dung tin nhắn đầy đủ gồm khóa học & khung giờ
        const details = [
            course ? `Khóa học: ${course}` : '',
            studyMode ? `Hình thức: ${studyMode}` : '',
            timeSlot ? `Khung giờ: ${timeSlot}` : '',
            userMessage ? `Ghi chú: ${userMessage}` : '',
        ].filter(Boolean).join(' | ');

        const finalMessage = details || userMessage || 'Đăng ký nhận tư vấn khóa học tiếng Trung';

        // Lưu vào DB nếu có cấu hình, nếu chưa có DB hoặc lỗi DB thì không làm crash giao diện
        try {
            await ensureDbReady();
            await sql`
                insert into contacts (name, email, phone, subject, message, ip, user_agent)
                values (${name}, ${email}, ${cleanPhone}, ${subject}, ${finalMessage}, ${ip || null}, ${userAgent || null});
            `;
            console.log(`[Contact] Saved registration from ${name} (${cleanPhone})`);
        } catch (dbErr) {
            console.warn('[Contact] Database not available or insert skipped, but submission accepted:', dbErr);
        }

        if (isFormData) {
            return NextResponse.redirect(new URL('/dang-ky?thanh-cong=1', request.url));
        }

        return NextResponse.json({
            ok: true,
            message: 'Đăng ký thành công! Trung tâm HSK Việt sẽ liên hệ lại với bạn trong vòng 24 giờ.',
        });
    } catch (error) {
        console.error('POST /api/contact error:', error);
        return NextResponse.json({
            ok: false,
            error: 'Hệ thống đang bận. Bạn vui lòng gọi Hotline trực tiếp để được hỗ trợ ngay lập tức!',
        }, { status: 500 });
    }
}
