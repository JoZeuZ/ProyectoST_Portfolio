import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), eslint(), UnoCSS()]
});
