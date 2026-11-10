'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
          <div className="text-center max-w-xl">
            <p className="text-sm font-medium text-[var(--muted)] mb-3">Đã xảy ra lỗi</p>
            <h1 className="text-3xl md:text-4xl font-semibold text-[var(--title)] mb-3 tracking-tight font-serif">Lỗi hệ thống</h1>
            <p className="text-[var(--text)] mb-8">
              Vui lòng thử tải lại trang. Nếu lỗi vẫn tiếp diễn, hãy liên hệ với chúng tôi.
            </p>
            <button
              onClick={reset}
              className="btn btn-primary"
            >
              Tải lại
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
