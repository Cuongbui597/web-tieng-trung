import "./globals.css";
import { Inter, Playfair_Display } from 'next/font/google';
import { getLocalBusinessSchema, getWebSiteSchema, toJsonLd } from '@/lib/schema';
import { Metadata, Viewport } from 'next';
import { ReactNode } from 'react';
import CartProviderWrapper from '@/providers/CartProviderWrapper';
import NextTopLoader from 'nextjs-toploader';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({
    subsets: ['latin', 'latin-ext', 'vietnamese'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
    variable: '--font-sans',
});

const playfair = Playfair_Display({
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    weight: ['600', '700'],
    variable: '--font-serif',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export const metadata: Metadata = {
    title: {
        default: "Trung Tâm Tiếng Trung HSK Việt – Đào Tạo HSK 1→3, Giao Tiếp, Trẻ Em",
        template: "%s | Tiếng Trung HSK Việt"
    },
    description: "Đào tạo tiếng Trung chất lượng cao: Luyện thi HSK 1-3, giao tiếp công xưởng, văn phòng công ty, tiếng Trung cho trẻ em. Giáo viên nhiệt tình, lộ trình rõ ràng.",
    keywords: [
        "học tiếng trung", "hsk 1", "hsk 2", "hsk 3", "luyện thi hsk",
        "tiếng trung giao tiếp", "tiếng trung công xưởng", "tiếng trung công ty",
        "tiếng trung trẻ em", "học tiếng trung đà nẵng", "tự học tiếng trung",
        "từ vựng hsk", "ngữ pháp tiếng trung"
    ],
    openGraph: {
        type: "website",
        locale: "vi_VN",
        url: "https://tiengtrunghsk.vn",
        siteName: "Trung Tâm Tiếng Trung HSK Việt",
        title: "Trung Tâm Tiếng Trung HSK Việt – HSK 1-3, Giao Tiếp, Trẻ Em",
        description: "Khóa học tiếng Trung toàn diện từ cơ bản đến nâng cao. Giáo trình chuẩn quốc tế.",
        images: [
            {
                url: "https://tiengtrunghsk.vn/og.svg",
                width: 1200,
                height: 630,
                alt: "Tiếng Trung HSK Việt"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Trung Tâm Tiếng Trung HSK Việt",
        description: "Luyện thi HSK 1-3, Tiếng Trung công xưởng & công ty, Tiếng Trung trẻ em.",
    },
    icons: {
        icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
        apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
        }
    },
    metadataBase: new URL('https://tiengtrunghsk.vn'),
    alternates: {
        canonical: './',
    }
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    const localBusinessSchema = getLocalBusinessSchema();
    const websiteSchema = getWebSiteSchema();

    return (
        <html lang="vi" className={`${inter.variable} ${playfair.variable}`}>
            <head>
                <meta charSet="utf-8" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: toJsonLd(websiteSchema) }}
                />
            </head>
            <body className="bg-[var(--bg)] text-[var(--text)]">
                <NextTopLoader color="var(--accent)" showSpinner={false} />
                <CartProviderWrapper>
                    {children}
                </CartProviderWrapper>
                {process.env.NEXT_PUBLIC_GA_ID && (
                    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
                )}
                {process.env.NEXT_PUBLIC_GTM_ID && (
                    <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
                )}
            </body>
        </html>
    );
}
