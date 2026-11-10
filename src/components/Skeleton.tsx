export function ProductCardSkeleton() {
    return (
        <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-md border border-[var(--border)] animate-pulse">
            <div className="h-48 bg-[var(--surface-2)]"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-[var(--surface-2)] rounded w-20"></div>
                <div className="h-5 bg-[var(--surface-2)] rounded w-3/4"></div>
                <div className="h-4 bg-[var(--surface-2)] rounded w-full"></div>
                <div className="flex justify-between items-center">
                    <div className="h-6 bg-[var(--surface-2)] rounded w-24"></div>
                    <div className="h-8 bg-[var(--surface-2)] rounded w-20"></div>
                </div>
            </div>
        </div>
    );
}

export function ArticleCardSkeleton() {
    return (
        <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] overflow-hidden shadow-sm border border-[var(--border)] animate-pulse">
            <div className="h-48 bg-[var(--surface-2)]"></div>
            <div className="p-5 space-y-3">
                <div className="h-3 bg-[var(--surface-2)] rounded w-24"></div>
                <div className="h-5 bg-[var(--surface-2)] rounded w-full"></div>
                <div className="h-4 bg-[var(--surface-2)] rounded w-2/3"></div>
            </div>
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="aspect-square bg-[var(--surface-2)] rounded-[var(--radius-lg)] border border-[var(--border)]"></div>
                <div className="space-y-6">
                    <div className="h-4 bg-[var(--surface-2)] rounded w-32"></div>
                    <div className="h-10 bg-[var(--surface-2)] rounded w-3/4"></div>
                    <div className="h-8 bg-[var(--surface-2)] rounded w-40"></div>
                    <div className="h-6 bg-[var(--surface-2)] rounded w-48"></div>
                    <div className="space-y-2">
                        <div className="h-4 bg-[var(--surface-2)] rounded w-full"></div>
                        <div className="h-4 bg-[var(--surface-2)] rounded w-full"></div>
                        <div className="h-4 bg-[var(--surface-2)] rounded w-3/4"></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="h-12 bg-[var(--surface-2)] rounded flex-1"></div>
                        <div className="h-12 bg-[var(--surface-2)] rounded flex-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
