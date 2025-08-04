require("dotenv").config();
const { execSync } = require("child_process");

function runI18nexusPull(apiKey) {
  if (!apiKey) {
    /* eslint-disable no-console */
    console.error("Missing API key");
    process.exit(1);
  }
  execSync(`I18NEXUS_API_KEY="${apiKey}" i18nexus pull`, { stdio: "inherit" });
}

// Use CI environment variables if available, else fall back to .env
const API_KEY1 =
  process.env.I18NEXUS_API_KEY1 || process.env.GITHUB_I18NEXUS_API_KEY1;
const API_KEY2 =
  process.env.I18NEXUS_API_KEY2 || process.env.GITHUB_I18NEXUS_API_KEY2;

runI18nexusPull(process.env.I18NEXUS_API_KEY1);
runI18nexusPull(process.env.I18NEXUS_API_KEY2);
