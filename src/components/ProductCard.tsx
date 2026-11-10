import Link from 'next/link';
import Image from 'next/image';
import { slugify } from '@/lib/client';
import { CATEGORY_ITEMS } from '@/lib/constants';
import { formatPrice } from '@/lib/format';
import { Product } from '@/lib/db';

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
    const categorySlug = slugify(product.category || 'Khác');

    // SANITIZE: Ignore Google Drive links
    const safeImage = (product.images && !product.images.includes('drive.google.com')) // Changed product.image to product.images based on db.ts
        ? product.images
        : '/placeholder-plant.svg';

    return (
        <Link key={product.slug} href={`/cua-hang/${categorySlug}/${product.slug}`} className="block h-full">
            <div className="group cursor-pointer h-full flex flex-col bg-white/70 backdrop-blur-xl border border-white/50 rounded-[1.5rem] overflow-hidden hover:shadow-2xl hover:bg-white/80 transition-all duration-300 shadow-lg">
                {/* Image Section - SQUARE as requested */}
                <div className="relative w-full aspect-square bg-gray-100">
                    <Image
                        src={safeImage}
                        alt={product.name || 'Cây cảnh'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, 400px"
                        quality={60}
                        priority={priority}
                    />
                </div>

                <div className="flex-1 flex flex-col p-3">
                    {/* Title - Blue */}
                    <h3 className="text-[15px] font-medium text-blue-600 line-clamp-2 leading-snug group-hover:underline min-h-[2.5rem]">
                        {product.name}
                    </h3>

                    {/* Mock Rating & Sold */}
                    <div className="flex items-center justify-between mt-2 mb-2">
                        <div className="flex items-center gap-1">
                            <div className="flex text-yellow-400 text-xs">
                                {'★★★★★'.split('').map((c, i) => <span key={i}>★</span>)}
                            </div>
                            <span className="text-xs text-gray-500">4.8</span>
                        </div>
                        <span className="text-xs text-gray-500">Đã bán 99+</span>
                    </div>

                    {/* Key Specs - Minimal */}
                    {/* Key Specs - Inline */}
                    <div className="mb-2 text-xs text-gray-500 flex flex-wrap gap-2 items-center">
                        {product.height && (
                            <span className="flex items-center gap-1">
                                <span className="opacity-70">Cao:</span>
                                <span>{product.height}</span>
                            </span>
                        )}
                        {product.root_diameter && (
                            <span className="flex items-center gap-1 before:content-['•'] before:mr-2 before:text-gray-300">
                                <span className="opacity-70">ĐK:</span>
                                <span>{product.root_diameter}</span>
                            </span>
                        )}
                        {product.crown_width && (
                            <span className="flex items-center gap-1 before:content-['•'] before:mr-2 before:text-gray-300">
                                <span className="opacity-70">Tán:</span>
                                <span>{product.crown_width}</span>
                            </span>
                        )}
                        {product.pot_specification && (
                            <span className="flex items-center gap-1 before:content-['•'] before:mr-2 before:text-gray-300">
                                <span className="opacity-70">Chậu:</span>
                                <span>{product.pot_specification}</span>
                            </span>
                        )}
                    </div>

                    {/* Price Section */}
                    <div className="mt-auto">
                        <div className="flex items-baseline gap-2">
                            <span className="text-xl font-bold text-red-600">
                                {product.price ? formatPrice(product.price) : 'Liên hệ'}
                            </span>
                            {product.original_price != null && product.price != null && product.original_price > product.price && (
                                <span className="text-sm text-gray-400 line-through">
                                    {formatPrice(product.original_price)}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Categories/Tags */}
                    <div className="mt-2 text-xs text-gray-500 truncate">
                        <span className="text-gray-400">Danh mục: </span>
                        <span className="italic text-blue-500 hover:underline">
                            {(() => {
                                const currentSlug = slugify(product.category || 'Khác');
                                const found = CATEGORY_ITEMS.find(c => slugify(c.value) === currentSlug || slugify(c.label) === currentSlug);
                                return found ? found.label : (product.category || 'Cây cảnh');
                            })()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
