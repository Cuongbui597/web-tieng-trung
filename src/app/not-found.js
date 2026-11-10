import Link from 'next/link';

export const metadata = {
  title: "Trang Không Tìm Thấy",
  description: "Trang này không tồn tại. Quay lại trang chủ hoặc khám phá sản phẩm của chúng tôi.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <p className="text-sm font-medium text-[var(--muted)] mb-3">404</p>
        <h1 className="text-4xl md:text-5xl font-semibold text-[var(--title)] mb-4 tracking-tight font-serif">Trang không tồn tại</h1>
        <p className="text-[var(--text)] mb-10 leading-relaxed">
          Xin lỗi, trang bạn tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="btn btn-primary"
          >
            Về trang chủ
          </Link>
          <Link
            href="/cua-hang"
            className="btn btn-secondary"
          >
            Xem sản phẩm
          </Link>
        </div>
      </div>
    </main>
  );
}
