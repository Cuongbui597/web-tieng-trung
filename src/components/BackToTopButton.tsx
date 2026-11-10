"use client";

import { useEffect, useState } from 'react';

export default function BackToTopButton() {
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;

            setProgress(scrollPercent);
            setIsVisible(scrollTop > 300);
        };

        window.addEventListener('scroll', updateProgress);
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    if (!isVisible) return null;

    const strokeDashoffset = 100 - progress * 100;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-8 left-8 z-50 group flex items-center justify-center w-12 h-12 rounded-full bg-white text-[var(--accent)] shadow-lg hover:-translate-y-1 transition-all duration-300 border border-[var(--border)]"
            aria-label="Lên đầu trang"
        >
            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                <path
                    className="text-[var(--border)]"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <path
                    className="text-[var(--accent)] transition-all duration-100 ease-out"
                    strokeDasharray="100, 100"
                    strokeDashoffset={strokeDashoffset}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                />
            </svg>

            {/* Arrow Icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    );
}
