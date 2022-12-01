/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/login': { page: '/login' },
    }
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:8000'
  },
  images: {unoptimized: true}
}

module.exports = nextConfig
