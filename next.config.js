// @type {import('next').NextConfig};

const nextConfig = {
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "en",
  },

  eslint: {
    ignoreDuringBuilds: false, // This should be `false` if you want ESLint to run during builds
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
