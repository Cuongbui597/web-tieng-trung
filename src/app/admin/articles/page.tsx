export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, Article } from '@/lib/articles';

export default async function AdminArticlesPage() {
    let articles: Article[] = [];
    try {
        articles = await getAllArticles();
    } catch {
        articles = [];
    }

    return (
        <main className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-rose-50 text-rose-700 uppercase tracking-wider mb-2">
                        <span>📰</span> Hệ Thống Blog & Tin Tức
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Quản Lý Bài Viết
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Hiện có <strong>{articles.length} bài viết</strong> trên hệ thống website Tiếng Trung HSK Việt.
                    </p>
                </div>

                <Link
                    href="/admin/articles/create"
                    className="inline-flex items-center justify-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-3 rounded-2xl shadow-md hover:scale-102 active:scale-98 transition-all shrink-0 cursor-pointer"
                >
                    <span className="text-lg">➕</span>
                    <span>Thêm bài viết mới</span>
                </Link>
            </div>

            {/* Articles Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs uppercase font-extrabold tracking-wider">
                                <th className="py-4 px-6">Ảnh / Tiêu đề bài viết</th>
                                <th className="py-4 px-6">Tác giả</th>
                                <th className="py-4 px-6">Ngày đăng</th>
                                <th className="py-4 px-6 text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {articles.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-400">
                                        <div className="text-4xl mb-2">📝</div>
                                        <div className="font-semibold">Chưa có bài viết nào</div>
                                        <div className="text-xs mt-1">Bấm nút &quot;Thêm bài viết mới&quot; phía trên để bắt đầu soạn bài.</div>
                                    </td>
                                </tr>
                            ) : (
                                articles.map((article) => {
                                    const imageSrc = article.image || '/images/blog/hoc-tieng-trung.jpg';
                                    return (
                                        <tr key={article.slug} className="hover:bg-slate-50/60 transition">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                                                        <Image
                                                            src={imageSrc}
                                                            alt={article.title}
                                                            fill
                                                            className="object-cover"
                                                            sizes="64px"
                                                        />
                                                    </div>
                                                    <div>
                                                        <div className="font-extrabold text-slate-900 line-clamp-1 hover:text-rose-600 transition">
                                                            {article.title}
                                                        </div>
                                                        <div className="text-xs text-slate-400 font-mono mt-0.5">
                                                            /bai-viet/{article.slug}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-200">
                                                    {article.author || 'Cô Lê Nguyễn Hồng Yên'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-slate-500 whitespace-nowrap text-xs font-medium">
                                                {article.date ? new Date(article.date).toLocaleDateString('vi-VN') : 'Mới'}
                                            </td>
                                            <td className="py-4 px-6 text-right whitespace-nowrap">
                                                <div className="inline-flex items-center gap-2">
                                                    <Link
                                                        href={`/bai-viet/${article.slug}`}
                                                        target="_blank"
                                                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                                                    >
                                                        Xem ↗
                                                    </Link>
                                                    <Link
                                                        href={`/admin/articles/${article.slug}/edit`}
                                                        className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition"
                                                    >
                                                        Sửa ✏️
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}
