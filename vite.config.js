import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/react-gh-pages/' : '/',
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: fileURLToPath(new URL('./src', import.meta.url)),
            },
            {
                find: '@assets',
                replacement: fileURLToPath(
                    new URL('./src/assets', import.meta.url)
                ),
            },
            {
                find: '@components',
                replacement: fileURLToPath(
                    new URL('./src/components', import.meta.url)
                ),
            },
            {
                find: '@hook',
                replacement: fileURLToPath(
                    new URL('./src/hook', import.meta.url)
                ),
            },
            {
                find: '@layouts',
                replacement: fileURLToPath(
                    new URL('./src/layouts', import.meta.url)
                ),
            },
            {
                find: '@pages',
                replacement: fileURLToPath(
                    new URL('./src/pages', import.meta.url)
                ),
            },
            {
                find: '@utils',
                replacement: fileURLToPath(
                    new URL('./src/utils', import.meta.url)
                ),
            },
        ],
    },
});
