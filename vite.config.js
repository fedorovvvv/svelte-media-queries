import { sveltekit } from '@sveltejs/kit/vite';

const config = {
    plugins: [
        sveltekit(),
    ],
    optimizeDeps: {
        exclude: ['@urql/svelte']
    },
};

export default config;