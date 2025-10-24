import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import * as fs from "fs";

function getEntries(): Record<string, string> {
  const baseDir = path.resolve(__dirname, "src/ranges");
  const entries: Record<string, string> = {};

  function walk(dir: string) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        walk(fullPath);
      } else if (file.name === "main.tsx") {
        const relDir = path.relative(baseDir, path.dirname(fullPath));
        entries[`ranges/js/${relDir}`] = fullPath;
      }
    }
  }

  walk(baseDir);
  return entries;
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: getEntries(),
      output: {
        entryFileNames: (chunkInfo) => `${chunkInfo.name}.js`,
      },
    },
  },
});
