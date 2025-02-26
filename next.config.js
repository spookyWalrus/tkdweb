/** @type {import('next').NextConfig} */
const path = require("path"); // Add this line to import the 'path' module

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false, // This should be `false` if you want ESLint to run during builds
  },
  reactStrictMode: false,
  images: {
    unoptimized: true, // Disable Next.js image optimization
  },
  webpack: (config) => {
    // Alias React and ReactDOM to ensure the correct version is used
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.resolve(__dirname, "node_modules/react"),
      "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
    };
    return config;
  },
};

module.exports = nextConfig;
