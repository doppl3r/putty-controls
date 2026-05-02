import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(async () => ({
  base: './',
  build: {
    emptyOutDir: true,
    outDir: './demo',
    target: "es2022"
  },
  css: {
    preprocessorOptions : {
      scss: {
        api: "modern",
      }        
    } 
  },
  clearScreen: false,
  plugins: [
    vue()
  ],
}));
