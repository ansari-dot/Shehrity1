{
    /*import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';

    export default defineConfig({
        plugins: [react()],
        server: {
            proxy: {
                '/uploads': {
                    target: 'http://localhost:3000',
                    changeOrigin: true,
                },
            },
        },
    });*/
}
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    // ... your other config
    plugins: [react()],

    server: {
        port: 3000,
    },
});