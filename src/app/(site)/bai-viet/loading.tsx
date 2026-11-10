
export default function ArticlesLoading() {
    return (
        <main className="min-h-screen bg-[var(--bg)]">
            {/* Header Skeleton */}
            <section className="py-24 px-4 bg-gradient-sage">
                <div className="max-w-sm mx-auto text-center space-y-4 animate-pulse">
                    <div className="h-12 bg-[rgba(255,255,255,0.3)] rounded w-3/4 mx-auto"></div>
                    <div className="h-6 bg-[rgba(255,255,255,0.3)] rounded w-1/2 mx-auto"></div>
                </div>
            </section>

            {/* Articles Grid Skeleton - Matches horizontal layout */}
            <section className="py-24 px-4 bg-[var(--bg)]">
                <div className="max-w-5xl mx-auto space-y-14 relative">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border)] animate-pulse">
                            <div className="flex flex-col md:flex-row gap-0">
                                {/* Image Skeleton */}
                                <div className="w-full md:w-64 aspect-square bg-[var(--surface-2)] flex-shrink-0"></div>

                                {/* Content Skeleton */}
                                <div className="flex-1 p-8 md:p-10 space-y-4 flex flex-col justify-center">
                                    <div className="h-4 bg-[var(--surface-2)] rounded w-32"></div>
                                    <div className="h-8 bg-[var(--surface-2)] rounded w-3/4"></div>
                                    <div className="h-4 bg-[var(--surface-2)] rounded w-full"></div>
                                    <div className="h-4 bg-[var(--surface-2)] rounded w-2/3"></div>
                                    <div className="h-4 bg-[var(--surface-2)] rounded w-24 mt-2"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
