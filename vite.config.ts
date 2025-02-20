import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import generouted from "@generouted/react-router/plugin";
import tailwind from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react({ babel: { plugins: [["babel-plugin-react-compiler"]] } }),
    tailwind(),
    generouted(),
  ],
  esbuild: {
    legalComments: "none",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
