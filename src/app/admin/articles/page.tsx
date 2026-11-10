export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import { ensureDbReady, sql } from '@/lib/db';

interface ArticleRow {
    slug: string;
    title: string;
    author: string;
    date: string;
    created_at: string;
}

export default async function AdminArticlesPage() {
    let articles: ArticleRow[] = [];
    let dbError = '';

    try {
        await ensureDbReady();
        const result = await sql`
            SELECT slug, title, author, date, created_at
            FROM articles
            ORDER BY created_at DESC
        `;
        articles = (result.rows || []) as ArticleRow[];
    } catch (err: any) {
        dbError = err.message || String(err);
    }

    return (
        <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Quản lý bài viết</h1>
                    <p className="text-sm opacity-80">Danh sách bài viết từ Database</p>
                </div>
                <Link
                    href="/admin/articles/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    + Thêm bài viết
                </Link>
            </header>

            {dbError ? (
                <div className="p-4 bg-red-50 text-red-600 border border-red-200 rounded-lg">
                    Lỗi: {dbError}
                </div>
            ) : null}

            <div className="rounded-xl border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="py-3 px-4 text-left">Tiêu đề</th>
                                <th className="py-3 px-4 text-left">Tác giả</th>
                                <th className="py-3 px-4 text-left">Ngày xuất bản</th>
                                <th className="py-3 px-4 text-left">Ngày tạo (DB)</th>
                                <th className="py-3 px-4 text-left">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center opacity-60">
                                        Chưa có bài viết nào trong database.<br />
                                        (Các bài viết cũ từ file .md không hiển thị ở đây)
                                    </td>
                                </tr>
                            ) : (
                                articles.map((a) => (
                                    <tr key={a.slug} className="hover:bg-gray-50/50">
                                        <td className="py-3 px-4">
                                            <div className="font-medium text-gray-900">{a.title}</div>
                                            <div className="text-xs text-gray-500">/{a.slug}</div>
                                        </td>
                                        <td className="py-3 px-4">
                                            {a.author || 'Ẩn danh'}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap text-sm">
                                            {a.date}
                                        </td>
                                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap text-sm">
                                            {new Date(a.created_at).toLocaleDateString('vi-VN')}
                                        </td>
                                        <td className="py-3 px-4">
                                            <Link
                                                href={`/admin/articles/${a.slug}/edit`}
                                                className="text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline"
                                            >
                                                Sửa / Chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
