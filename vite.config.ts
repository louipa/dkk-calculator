import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/dkk-calculator/",
  server: {
    host: true,
    allowedHosts: true,
  },
});
