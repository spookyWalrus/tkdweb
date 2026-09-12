// scripts/localTrans.js
const fs = require("fs");
const path = require("path");
const os = require("os");

const SOURCE_DIR = path.join(os.homedir(), "Documents/TKD/transSources-json");
const DEST_DIR = path.join(__dirname, "../locales");

function copyLocalTranslations() {
  try {
    if (!fs.existsSync(SOURCE_DIR)) {
      console.error(`ERROR: Source directory does not exist at: ${SOURCE_DIR}`);
      process.exit(1);
    }

    // 1. Completely delete the existing destination directory to remove old files
    if (fs.existsSync(DEST_DIR)) {
      fs.rmSync(DEST_DIR, { recursive: true, force: true });
    }

    // 2. Re-create the empty destination directory
    fs.mkdirSync(DEST_DIR, { recursive: true });

    // 3. Copy everything fresh from source
    fs.cpSync(SOURCE_DIR, DEST_DIR, { recursive: true, force: true });

    console.warn(
      "[i18n] Successfully wiped existing locales and copied fresh translations."
    );
  } catch (err) {
    console.error("[i18n] Failed to copy local translations:", err);
    process.exit(1);
  }
}

copyLocalTranslations();
