import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const { SITE_URL } =
  loadEnv(process.env.SITE_URL, process.cwd(), "") || "https://localhost:4321/";

export default defineConfig({
  image: {
    domains: ["unpkg.com"],
    remotePatterns: [{ protocol: "https" }],
  },

  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "Content-Security-Policy": `default-src * ${SITE_URL}; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' ${SITE_URL} https://unpkg.com/ data:`,
      "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Upgrade-Insecure-Requests": "1",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  },

  site: SITE_URL,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
  adapter: vercel(),
});
