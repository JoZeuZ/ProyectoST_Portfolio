import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";
import eslint from 'vite-plugin-eslint';
// import { splitVendorChunkPlugin } from 'vite'; // eliminado porque se usa manualChunks en lugar de plugin

export default defineConfig({
  plugins: [
    react(), 
    eslint(), 
    UnoCSS(),
    // splitVendorChunkPlugin(),
  ],
  build: {
    cssCodeSplit: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'calendly': ['react-calendly'],
        },
      },
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'web-vitals', 'react-helmet'],
  },
});
