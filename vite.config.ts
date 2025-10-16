import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-static-files',
      apply: 'build',
      enforce: 'post',
      async writeBundle() {
        const filesToCopy = [
          'thanks.html',
          'contractor-application-form.html',
          'customer-acquisition-form.html',
          '_redirects'
        ];
        const distDir = resolve(__dirname, 'dist');
        
        try {
          mkdirSync(distDir, { recursive: true });
        } catch (e) {
          // Directory exists
        }
        
        filesToCopy.forEach(file => {
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
