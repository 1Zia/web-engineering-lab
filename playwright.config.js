const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  use: {
    baseURL: "http://localhost:3000",
    channel: "chrome",
    viewport: { width: 1280, height: 900 },
  },
  webServer: {
    command: "node node_modules/serve/build/main.js public -l 3000",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
