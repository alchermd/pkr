import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

// Dynamically find all main.jsx entry points
function getEntries() {
  const baseDir = path.resolve(__dirname, "src/ranges");
  const entries = {};

  function walk(dir) {
    const files = fs.readdirSync(dir, {withFileTypes: true});
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      if (file.isDirectory()) {
        walk(fullPath);
      } else if (file.name === "main.jsx") {
        const relDir = path.relative(baseDir, path.dirname(fullPath));
        // Output: dist/ranges/js/[relDirName].js
        entries[`ranges/js/${relDir}`] = fullPath;
      }
    }
  }

  walk(baseDir);
  return entries;
}

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: false,
    rollupOptions: {
      input: getEntries(),
      output: {
        entryFileNames: (chunkInfo) => {
          // Preserve the folder name in dist/ranges/js
          return `${chunkInfo.name}.js`;
        },
      },
    },
  },
});
