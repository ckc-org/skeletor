/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: 'http://localhost:8000'
  },
  images: {unoptimized: true}
}

module.exports = nextConfig
