/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";
import path from "path";
import { loadEnv } from "vite";

export default getViteConfig({
  test: {
    dir: "test",
    alias: {
      "~": path.resolve(__dirname, "./src/"),
      "@/": path.resolve(__dirname, "./src/"),
    },
    env: loadEnv("", process.cwd(), ""),
  },
});
