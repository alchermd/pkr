import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    // TODO: Update this pattern when the tests are migrated to ts/tsx
    include: ["**/*.test.{js,jsx,ts,tsx}"],
    globals: true,
    environment: "jsdom",
  },
});
