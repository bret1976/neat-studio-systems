import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  timeout: 60000,
  expect: { timeout: 10000 },
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: {
    baseURL: process.env.BASE_URL || "http://localhost:3120",
    trace: process.env.VERCEL_OIDC_TOKEN ? "off" : "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "wide", use: { viewport: { width: 1920, height: 1080 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 } } },
    { name: "laptop", use: { viewport: { width: 1024, height: 768 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "chromium",
        viewport: { width: 390, height: 844 },
      },
    },
    {
      name: "small-mobile",
      use: {
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["iPhone 13"],
        defaultBrowserType: "webkit",
        viewport: { width: 390, height: 844 },
      },
    },
  ],
});
