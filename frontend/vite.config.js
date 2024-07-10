import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     outDir: 'dist', // This is the default, but ensure it's set if you've customized it
//   },
// define: {
//   'process.env': process.env,
// },
//   proxy: {
//     '/api': {
//       target: 'http://localhost:8000/api',
//       changeOrigin: true,
//       rewrite: (path) => path.replace(/^\/api/, ''),
//     },
//   },
// });

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure this is set to 'dist'
    rollupOptions: {
      output: {
        sourcemap: true, // Optional: useful for debugging
      },
    },
  },
  define: {
    'process.env': process.env,
  },
});
