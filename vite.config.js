import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
          targets: [
              { src: 'node_modules/scichart/_wasm/scichart2d.data', dest: '' },
              { src: 'node_modules/scichart/_wasm/scichart2d.wasm', dest: '' },
              // Optional, if using 3D charts
              { src: 'node_modules/scichart/_wasm/scichart3d.data', dest: '' },
              { src: 'node_modules/scichart/_wasm/scichart3d.wasm', dest: '' },
          ],
      }),
    ],
    optimizeDeps: {
      include: ["scichart"], // Ensure SciChart dependencies are pre-bundled
  },
    server: {
      port: 3000,
      open: true,
    },
});