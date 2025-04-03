// jest.config.js
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Path to Next.js app
});

module.exports = createJestConfig({
  testEnvironment: "jest-environment-jsdom",
  //   setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Optional setup file
});
