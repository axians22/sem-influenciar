import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base relativa: o build funciona em qualquer subpasta (GitHub Pages incluso)
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
