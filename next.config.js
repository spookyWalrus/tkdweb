/**
 * *@type {import('next').NextConfig}
 * */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // This should be `false` if you want ESLint to run during builds
  },
  reactStrictMode: false,
  trailingSlash: false,
};

module.exports = withNextIntl(nextConfig);
