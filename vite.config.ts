import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

export default defineConfig(({ command, mode }) => {
  return {
    resolve: {
      alias: {
        '@/': path.resolve(__dirname, './src'),
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/constants': path.resolve(__dirname, './src/constants'),
        '@/core': path.resolve(__dirname, './src/core'),
        '@/hoc': path.resolve(__dirname, './src/hoc'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/redux': path.resolve(__dirname, './src/redux'),
        '@/router': path.resolve(__dirname, './src/router'),
        '@/services': path.resolve(__dirname, './src/services'),
        '@/utils': path.resolve(__dirname, './src/utils'),
      },
    },
    plugins: [react(), TanStackRouterVite()],
  };
});
