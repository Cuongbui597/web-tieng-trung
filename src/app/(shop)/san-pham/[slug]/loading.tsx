
import { ProductDetailSkeleton } from "@/components/Skeleton";

export default function ProductLoading() {
    return (
        <main className="min-h-screen bg-[var(--bg)] py-12 md:py-20 px-4">
            <div className="container-app">
                <ProductDetailSkeleton />
            </div>
        </main>
    );
}
