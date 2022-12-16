const withPlugins = require('next-with-plugins')
/** @type {import('next').NextConfig} */
const nextConfig = withPlugins({
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:8000'
  },
  pageFolder: 'src/pages',
  images: { unoptimized: true },
  plugins: [
    'next-stylus'
  ]
})

module.exports = nextConfig
