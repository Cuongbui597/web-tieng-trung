'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const IMAGES = [
    '/hero/landscape-1.png',
    '/hero/landscape-2.png',
    '/hero/landscape-3.png',
];

export function HeroBackground() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-gray-900 pointer-events-none select-none">
            {IMAGES.map((src, index) => {
                const isActive = index === currentImageIndex;
                return (
                    <div
                        key={src}
                        className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div
                            className={`relative w-full h-full transform transition-transform duration-[12000ms] ease-out ${isActive ? 'scale-105' : 'scale-100'
                                }`}
                        >
                            <Image
                                src={src}
                                alt="Landscape background"
                                fill
                                priority={index === 0}
                                className="object-cover" // Full opacity for maximum clarity
                                quality={100}
                                sizes="100vw"
                            />
                            {/* Removed global overlay for maximum clarity as requested */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
