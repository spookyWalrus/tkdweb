/**
 * *@type {import('next').NextConfig}
 * */
const createNextIntlPlugin = require("next-intl/plugin");
const withNextIntl = createNextIntlPlugin();
const path = require("path");

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

    config.ignoreWarnings = [
      {
        module: /node_modules\/@supabase\/realtime-js/,
        message:
          /Critical dependency: the request of a dependency is an expression/,
      },
    ];

    return config;
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  reactStrictMode: false,
  experimental: {
    // Reduce compilation time
    optimizePackageImports: ["@supabase/supabase-js"],
  },
  env: {
    _next_intl_trailing_slash: "false",
  },
};

module.exports = withNextIntl(nextConfig);
