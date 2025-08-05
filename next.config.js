/**
 * *@type {import('next').NextConfig}
 * */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Disable webpack cache in CI environments
    if (process.env.CI) {
      config.cache = false;
    }

    // Handle Sass loader serialization
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
