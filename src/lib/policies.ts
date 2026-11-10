export interface PolicyPage {
    slug: string;
    title: string;
    excerpt: string;
    content: string[];
}

export const policyPages: PolicyPage[] = [
    {
        slug: 'huong-dan-thanh-toan',
        title: 'Hướng dẫn thanh toán',
        excerpt: 'Các phương thức thanh toán và lưu ý khi chuyển khoản.',
        content: [
            'Bạn có thể thanh toán bằng tiền mặt khi nhận hàng (COD) hoặc chuyển khoản.',
            'Khi chuyển khoản, vui lòng ghi đúng nội dung để đối soát đơn hàng nhanh hơn.',
            'Nếu cần hỗ trợ, hãy liên hệ qua trang Liên hệ để được hướng dẫn.',
        ],
    },
    {
        slug: 'chinh-sach-van-chuyen',
        title: 'Chính sách vận chuyển',
        excerpt: 'Thời gian giao hàng, phạm vi và các trường hợp phát sinh.',
        content: [
            'Thời gian giao hàng phụ thuộc khu vực và loại sản phẩm.',
            'Chúng tôi sẽ xác nhận đơn hàng trước khi giao.',
            'Trong một số trường hợp thời tiết/đường xa, thời gian có thể thay đổi.',
        ],
    },
    {
        slug: 'chinh-sach-doi-tra-hang',
        title: 'Chính sách đổi trả hàng',
        excerpt: 'Điều kiện đổi trả và quy trình xử lý khi sản phẩm có vấn đề.',
        content: [
            'Vui lòng kiểm tra sản phẩm khi nhận hàng.',
            'Nếu sản phẩm có lỗi do vận chuyển hoặc không đúng mô tả, hãy liên hệ sớm để được hỗ trợ.',
            'Chúng tôi ưu tiên giải pháp đổi/trả phù hợp theo từng trường hợp.',
        ],
    },
    {
        slug: 'chinh-sach-bao-mat',
        title: 'Chính sách bảo mật',
        excerpt: 'Cách chúng tôi thu thập và bảo vệ thông tin khách hàng.',
        content: [
            'Thông tin liên hệ được sử dụng để xác nhận đơn và hỗ trợ khách hàng.',
            'Chúng tôi không bán dữ liệu cho bên thứ ba.',
            'Bạn có thể yêu cầu chỉnh sửa/xóa thông tin theo nhu cầu.',
        ],
    },
];

export function getPolicyBySlug(slug: string): PolicyPage | null {
    return policyPages.find((p) => p.slug === slug) || null;
}
