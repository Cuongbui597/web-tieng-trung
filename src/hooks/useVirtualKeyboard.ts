"use client";

import { useState, useEffect, useCallback } from 'react';

export function useVirtualKeyboard() {
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [viewportHeight, setViewportHeight] = useState<number>(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const checkKeyboard = () => {
            if (window.visualViewport) {
                const vv = window.visualViewport;
                const windowHeight = window.innerHeight;
                const diff = windowHeight - vv.height;
                setViewportHeight(vv.height);

                // Nếu chênh lệch chiều cao > 120px thì chắc chắn bàn phím ảo đang mở
                if (diff > 120) {
                    setIsKeyboardOpen(true);
                    setKeyboardHeight(diff);
                } else {
                    setIsKeyboardOpen(false);
                    setKeyboardHeight(0);
                }
            } else {
                setViewportHeight(window.innerHeight);
            }
        };

        // Khởi tạo ngay giá trị ban đầu
        checkKeyboard();

        const handleFocusIn = (e: FocusEvent) => {
            const target = e.target as HTMLElement;
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
                // Đợi 250ms cho animation bàn phím trượt lên
                setTimeout(checkKeyboard, 250);
            }
        };

        const handleFocusOut = () => {
            setTimeout(() => {
                if (window.visualViewport) {
                    const diff = window.innerHeight - window.visualViewport.height;
                    if (diff <= 150) {
                        setIsKeyboardOpen(false);
                        setKeyboardHeight(0);
                    }
                } else {
                    setIsKeyboardOpen(false);
                    setKeyboardHeight(0);
                }
            }, 250);
        };

        if (window.visualViewport) {
            window.visualViewport.addEventListener('resize', checkKeyboard);
            window.visualViewport.addEventListener('scroll', checkKeyboard);
        }

        window.addEventListener('resize', checkKeyboard);
        window.addEventListener('focusin', handleFocusIn);
        window.addEventListener('focusout', handleFocusOut);

        const checkFullscreen = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', checkFullscreen);

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener('resize', checkKeyboard);
                window.visualViewport.removeEventListener('scroll', checkKeyboard);
            }
            window.removeEventListener('resize', checkKeyboard);
            window.removeEventListener('focusin', handleFocusIn);
            window.removeEventListener('focusout', handleFocusOut);
            document.removeEventListener('fullscreenchange', checkFullscreen);
        };
    }, []);

    const toggleFullscreen = useCallback(async () => {
        if (typeof document === 'undefined') return;

        try {
            if (!document.fullscreenElement) {
                if (document.documentElement.requestFullscreen) {
                    await document.documentElement.requestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    await document.exitFullscreen();
                }
            }
        } catch {
            // Fullscreen API may be blocked or not supported on some iOS Safari versions
        }
    }, []);

    return {
        isKeyboardOpen,
        keyboardHeight,
        viewportHeight,
        isFullscreen,
        toggleFullscreen,
    };
}
