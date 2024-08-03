import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

export default defineConfig({
  server:{
    proxy: {
      '/apiDev': {
        target: 'http://localhost/uniApi/api/Index.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api': {
        target: 'https://uni-api-puce.vercel.app/api/index.php',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})