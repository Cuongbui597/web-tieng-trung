import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export async function sendOrderEmail(order) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
        console.warn('Skipping email: Missing env vars');
        return false;
    }

    const { orderId, name, phone, address, items, total } = order;

    const itemsHtml = items
        .map(
            (item) =>
                `<li><strong>${item.title}</strong> - SL: ${item.quantity} - ${new Intl.NumberFormat('vi-VN').format(item.lineTotal)}đ</li>`
        )
        .join('');

    const html = `
    <h1>Đơn hàng mới: ${orderId}</h1>
    <p><strong>Khách hàng:</strong> ${name}</p>
    <p><strong>SĐT:</strong> <a href="tel:${phone}">${phone}</a></p>
    <p><strong>Địa chỉ:</strong> ${address}</p>
    
    <h3>Chi tiết đơn hàng:</h3>
    <ul>
      ${itemsHtml}
    </ul>
    
    <p><strong>Tổng cộng:</strong> ${new Intl.NumberFormat('vi-VN').format(total)}đ</p>
    <hr />
    <p>Vui lòng liên hệ khách để xác nhận đơn hàng.</p>
  `;

    try {
        await transporter.sendMail({
            from: `"Web Cây Cảnh" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_EMAIL,
            subject: `[Đơn Mới] ${name} - ${phone}`,
            html,
        });
        console.log(`Email sent to ${process.env.ADMIN_EMAIL} for order ${orderId}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
