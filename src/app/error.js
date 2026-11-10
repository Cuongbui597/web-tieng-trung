'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="text-center max-w-xl">
        <p className="text-sm font-medium text-[var(--muted)] mb-3">Đã xảy ra lỗi</p>
        <h2 className="text-3xl font-semibold text-[var(--title)] mb-3 tracking-tight font-serif">Không thể tải trang</h2>
        <p className="text-[var(--text)] mb-8">
          Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc liên hệ với chúng tôi nếu vấn đề vẫn tiếp tục.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="btn btn-primary"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="btn btn-secondary"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
