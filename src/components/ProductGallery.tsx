'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
    mainImage: string;
    gallery?: string[];
    productName: string;
}

export default function ProductGallery({ mainImage, gallery = [], productName }: ProductGalleryProps) {
    const [activeImage, setActiveImage] = useState(mainImage);
    const allImages = [mainImage, ...gallery].filter(Boolean); // Ensure mainImage is first, and filter out empties

    // Deduplicate images just in case
    const uniqueImages = Array.from(new Set(allImages));

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-[var(--radius-xl)] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)]">
                <Image
                    src={activeImage}
                    alt={productName}
                    fill
                    className="object-cover"
                    loading="eager"
                    sizes="(max-width: 1024px) 100vw, 800px"
                    quality={80}
                />
            </div>

            {/* Thumbnails */}
            {uniqueImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center">
                    {uniqueImages.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${activeImage === img ? 'border-[var(--accent)] ring-2 ring-[var(--accent)] ring-opacity-20' : 'border-transparent opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img}
                                alt={`${productName} thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
