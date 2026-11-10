export default function FloatingContactButtons() {
    const phone = '0931152486';

    return (
        <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-4 sm:right-6">
            {/* Zalo Button */}
            <div className="relative">
                <a
                    href={`https://zalo.me/${phone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
                    aria-label="Chat Zalo"
                    title="Chat Zalo"
                >
                    <img
                        src="/icons8-zalo-48.png"
                        alt="Zalo"
                        className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                </a>
            </div>

            {/* Phone Button */}
            <div className="relative flex items-center justify-center">
                {/* Pulse ring */}
                <div className="absolute h-full w-full animate-ping rounded-full bg-green-500 opacity-20"></div>
                <a
                    href={`tel:${phone}`}
                    className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-tr from-green-600 to-green-500 text-white shadow-[0_8px_30px_rgba(34,197,94,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(34,197,94,0.5)] border border-green-400/50"
                    aria-label="Gọi 0931152486"
                    title="Gọi 0931152486"
                >
                    <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                        aria-hidden="true"
                    >
                        <path
                            d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.3 1.7.54 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.06a2 2 0 0 1 2.11-.45c.8.24 1.64.42 2.5.54A2 2 0 0 1 22 16.92Z"
                            stroke="none"
                        />
                    </svg>
                </a>
            </div>
        </div>
    );
}
