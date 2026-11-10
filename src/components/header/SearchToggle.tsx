'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const toggleSearch = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/cua-hang?search=${encodeURIComponent(query.trim())}`);
            setIsOpen(false);
            setQuery(''); // Optional: clear after search
        }
    };

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                if (isOpen && !query) {
                    setIsOpen(false);
                }
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, query]);

    return (
        <div ref={containerRef} className="relative flex items-center">
            <div
                className={`absolute left-0 top-1/2 -translate-y-1/2 flex items-center transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'w-64 opacity-100 pl-10' : 'w-0 opacity-0'
                    }`}
            >
                <form onSubmit={handleSearch} className="w-full relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tìm kiếm..."
                        className="w-full pl-4 pr-4 py-2 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-full shadow-lg outline-none focus:border-[var(--accent)]"
                    />
                </form>
            </div>

            {/* Search Icon Button - z-index higher to sit on top if needed, or just let input slide out from under */}
            <button
                onClick={toggleSearch}
                className="relative z-10 p-2 text-[var(--muted)] hover:text-[var(--text)] transition-colors rounded-full hover:bg-[rgba(0,0,0,0.05)]"
                aria-label="Tìm kiếm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </button>
        </div>
    );
}
