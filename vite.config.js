import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://devmgramapi.meteo.pl",
        changeOrigin: true,
        secure: false, // ak API nepoužíva validný SSL certifikát
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
