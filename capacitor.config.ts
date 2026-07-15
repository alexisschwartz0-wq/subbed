import type { CapacitorConfig } from "@capacitor/cli";

// Subbed's Next.js app uses Server Actions, middleware-based session
// refresh, and mostly dynamic (server-rendered) routes — none of which
// survive a static export. So instead of bundling local web assets,
// the native shell loads the live production site directly.
const config: CapacitorConfig = {
  appId: "co.getsubbed.app",
  appName: "Subbed",
  webDir: "ios-shell",
  server: {
    url: "https://app.getsubbed.co",
    cleartext: false,
  },
  ios: {
    contentInset: "always",
  },
};

export default config;
