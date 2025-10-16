import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-html-files',
      apply: 'build',
      enforce: 'post',
      async writeBundle() {
        const files = ['thanks.html', 'contractor-application-form.html', 'customer-acquisition-form.html'];
        const distDir = resolve(__dirname, 'dist');
        
        // Ensure dist directory exists
        try {
          mkdirSync(distDir, { recursive: true });
        } catch (e) {
          // Directory already exists
        }
        
        files.forEach(file => {
          try {
            const src = resolve(__dirname, 'public', file);
            const dest = resolve(distDir, file);
            copyFileSync(src, dest);
            console.log(`✓ Copied ${file} to dist/`);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`✗ Failed to copy ${file}:`, message);
          }
        });
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
