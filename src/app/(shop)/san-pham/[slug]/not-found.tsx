import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[var(--bg)] py-20 px-4 text-center">
            <h1 className="text-4xl font-bold text-[var(--title)] mb-4">Sản phẩm không tìm thấy</h1>
            <p className="text-[var(--text)] mb-8">Rất tiếc, sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link href="/cua-hang">
                <button className="btn btn-primary">
                    Quay lại Cửa hàng
                </button>
            </Link>
        </main>
    );
}
