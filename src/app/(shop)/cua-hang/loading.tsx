
import { ProductCardSkeleton } from "@/components/Skeleton";

export default function StoreLoading() {
    return (
        <main className="min-h-screen bg-[var(--bg)]">
            {/* Header Skeleton */}
            <section className="bg-[var(--bg)] py-12 md:py-16 px-4">
                <div className="max-w-sm mx-auto text-center space-y-4 animate-pulse">
                    <div className="h-10 bg-[var(--surface-2)] rounded w-3/4 mx-auto"></div>
                    <div className="h-6 bg-[var(--surface-2)] rounded w-1/2 mx-auto"></div>
                </div>
            </section>

            {/* Content Skeleton */}
            <section className="pb-24 px-4 bg-[var(--bg)]">
                <div className="max-w-[var(--container)] mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
