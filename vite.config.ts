import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-html-files',
      apply: 'build',
      enforce: 'post',
      generateBundle() {
        const files = ['thanks.html', 'contractor-application-form.html', 'customer-acquisition-form.html'];
        files.forEach(file => {
          try {
            const src = resolve(__dirname, 'public', file);
            const dest = resolve(__dirname, 'dist', file);
            copyFileSync(src, dest);
            console.log(`Copied ${file} to dist/`);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.warn(`Could not copy ${file}:`, message);
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
