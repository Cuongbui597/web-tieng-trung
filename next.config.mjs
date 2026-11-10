/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  compress: true,
  async headers() {
    const immutable = 'public, max-age=31536000, immutable';
    const swrWeek = 'public, max-age=604800, stale-while-revalidate=86400';
    return [
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: immutable }],
      },
      {
        source: '/uploads/:path*',
        headers: [{ key: 'Cache-Control', value: swrWeek }],
      },
      {
        source: '/products/:path*',
        headers: [{ key: 'Cache-Control', value: swrWeek }],
      },
      {
        source: '/og.svg',
        headers: [{ key: 'Cache-Control', value: immutable }],
      },
      {
        source: '/icon.svg',
        headers: [{ key: 'Cache-Control', value: immutable }],
      },
      {
        source: '/apple-touch-icon.svg',
        headers: [{ key: 'Cache-Control', value: immutable }],
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    qualities: [60, 75],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'caycanhsaigon.life',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'caycanhhanoi.org',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'caycanhhanoi.vn',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'webcaycanh.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
