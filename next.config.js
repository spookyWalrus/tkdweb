/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // This should be `false` if you want ESLint to run during builds
  },
  reactStrictMode: false,
  images: {
    unoptimized: true, // Disable Next.js image optimization
  },
};

module.exports = nextConfig;
