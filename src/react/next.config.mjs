/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Optional: Enable experimental features that might improve performance
  experimental: {
    // Modern build optimization features
    optimizeCss: true,
    scrollRestoration: true,
  },
};

export default nextConfig;
