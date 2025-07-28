// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            // The entry point for your library
            entry: resolve(__dirname, 'src/lib/arc.js'),
            // The global variable name when used in a <script> tag
            name: 'Arc',
            // The filename for the output bundles
            fileName: (format) => `arc.${format}.js`,
        },
    },
});