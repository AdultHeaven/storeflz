/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const cacheHeaders = [
      {
        key: 'Cache-Control',
        value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
      },
      {
        key: 'Vercel-CDN-Cache-Control',
        value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
      },
      {
        key: 'CDN-Cache-Control',
        value: 'public, max-age=2592000, s-maxage=2592000, stale-while-revalidate=86400',
      },
    ];

    return [
      {
        source: '/',
        headers: cacheHeaders,
      },
      {
        source: '/report',
        headers: cacheHeaders,
      },
      {
        source: '/file/:path*',
        headers: cacheHeaders,
      },
      {
        source: '/folder/:path*',
        headers: cacheHeaders,
      },
    ];
  },
}

module.exports = nextConfig
