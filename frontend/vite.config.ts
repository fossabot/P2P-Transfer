/// Vite config
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

/* Export config */
export default defineConfig({
  base: '/',
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version)
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  server: {
    proxy: {
      '/socket.io': {
        changeOrigin: true,
        target: 'ws://localhost:3000',
        ws: true
      }
    }
  }
});
