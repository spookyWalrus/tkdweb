/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // This should be `false` if you want ESLint to run during builds
  },
};

module.exports = nextConfig;
