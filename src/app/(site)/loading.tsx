
import { ProductCardSkeleton } from "@/components/Skeleton";

export default function HomeLoading() {
    return (
        <main className="min-h-screen bg-[var(--bg)]">
            {/* Hero Skeleton */}
            <section className="pt-14 pb-14 md:pt-24 md:pb-24 bg-gradient-hero">
                <div className="container-app">
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                        <div className="h-6 bg-[rgba(0,0,0,0.05)] rounded-full w-48 mx-auto"></div>
                        <div className="space-y-4">
                            <div className="h-12 md:h-16 bg-[rgba(0,0,0,0.05)] rounded w-3/4 mx-auto"></div>
                            <div className="h-12 md:h-16 bg-[rgba(0,0,0,0.05)] rounded w-1/2 mx-auto"></div>
                        </div>
                        <div className="h-6 bg-[rgba(0,0,0,0.05)] rounded w-2/3 mx-auto"></div>
                        <div className="flex gap-4 justify-center pt-4">
                            <div className="h-12 w-36 bg-[rgba(0,0,0,0.05)] rounded"></div>
                            <div className="h-12 w-36 bg-[rgba(0,0,0,0.05)] rounded"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Skeleton */}
            <section className="py-20 px-4">
                <div className="container-app">
                    <div className="flex items-end justify-between gap-4 mb-10">
                        <div className="space-y-2">
                            <div className="h-8 bg-[var(--surface-2)] rounded w-40"></div>
                            <div className="h-4 bg-[var(--surface-2)] rounded w-56"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-40 bg-[var(--surface)] rounded-[var(--radius-lg)] border border-[var(--border)] animate-pulse"></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products Skeleton */}
            <section className="py-24 px-4">
                <div className="container-app">
                    <div className="text-center mb-20 space-y-4">
                        <div className="h-10 bg-[var(--surface-2)] rounded w-64 mx-auto"></div>
                        <div className="h-6 bg-[var(--surface-2)] rounded w-48 mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
