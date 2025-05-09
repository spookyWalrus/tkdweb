/**
 * *@type {import('next').NextConfig}
 * */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: false,
};

module.exports = withNextIntl(nextConfig);
