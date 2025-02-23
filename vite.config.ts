import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import tailwind from "@tailwindcss/vite";
import path from "path";
import packageJson from "./package.json";

const commitHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? "local";

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
    tailwind(),
    generouted(),
  ],
  esbuild: {
    legalComments: "none",
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: "[hash].css",
        chunkFileNames: "[hash].js",
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  define: {
    "import.meta.env.BUILD_VERSION": `"${packageJson.version}-${commitHash}"`,
  },
  server: {
    proxy: {
      "/mock-api/v4/merge_requests": {
        target: "http://localhost:5173",
        rewrite: () => "/demo.mock.json",
      },
    },
  },
});
