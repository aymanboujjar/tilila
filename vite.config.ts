import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';

/** Wayfinder-generated routes only use `queryParams` inside `.url =` closures; React Compiler can strip that import and break at runtime. */
function shouldSkipReactCompiler(id: string): boolean {
    const normalized = id.split('?')[0].replace(/\\/g, '/');
    return (
        normalized.includes('/resources/js/routes/') ||
        normalized.endsWith('/resources/js/wayfinder.ts')
    );
}

export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./resources/js', import.meta.url)),
        },
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        inertia(),
        react({
            babel: (id) => ({
                plugins: shouldSkipReactCompiler(id)
                    ? []
                    : ['babel-plugin-react-compiler'],
            }),
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
});
