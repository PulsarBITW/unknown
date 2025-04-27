import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
      },
      include: '**/*.svg',
    }),
    checker({
      typescript: {tsconfigPath: 'tsconfig.app.json'},
      eslint: {lintCommand: 'eslint .', useFlatConfig: true},
      stylelint: {
        lintCommand: 'stylelint "**/*.{css,scss}"',
      },
      overlay: {
        position: 'tl',
      },
    }),
  ],
  esbuild: {legalComments: 'none'},
  css: {
    modules: {
      generateScopedName: '[local]__[hash:base64:5]',
    },
  },
  server: {
    port: 3001,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  preview: {},
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@entities': path.resolve(__dirname, 'src/entities'),
      '@features': path.resolve(__dirname, 'src/features'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
});
