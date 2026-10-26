import { defineConfig } from "@playwright/test";

const baseURL = process.env.PW_BASE_URL || "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  fullyParallel: true,
  workers: 4,
  reporter: [["list"]],
  use: { baseURL, reducedMotion: "reduce" },
  // Start a production server automatically unless PW_BASE_URL points at one already.
  webServer: process.env.PW_BASE_URL ? undefined : { command: "npm run start", url: baseURL, reuseExistingServer: true, timeout: 120_000 },
});
