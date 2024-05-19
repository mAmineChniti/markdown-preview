import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const ReactCompilerConfig = {
  compilationMode: "annotation",
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [["babel-plugin-react-compiler", ReactCompilerConfig],
      ]
    },
  })],
  server: {
    watch: {
      usePolling: true,
    },
  },
  exclude: ['src/_codux/**'],
});
