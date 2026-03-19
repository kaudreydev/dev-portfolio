import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

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
      "Content-Security-Policy":
        "default-src * https://astro-naut.statichost.eu/; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' https://astro-naut.statichost.eu/ https://unpkg.com/ data:",
      "Permissions-Policy": "geolocation=(), camera=(), microphone=()",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Upgrade-Insecure-Requests": "1",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
    },
  },

  site: "https://astro-naut.statichost.eu/",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});
