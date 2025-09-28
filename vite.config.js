import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ----------------------------------------------------
  // ADD THIS BLOCK: Corrects the MIME type for CSS assets
  // ----------------------------------------------------
  server: {
    // This often forces the correct MIME type resolution for CSS/PostCSS plugins
    hmr: {
        overlay: true, // Keep the error overlay for debugging
    },
    // Ensure the server serves known file types correctly
    mime: {
        '.css': 'text/css',
    }
  },
  // ----------------------------------------------------
});
