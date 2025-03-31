import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
		host: '0.0.0.0',
		port: 5173,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost',
    //     changeOrigin: true,
		// 		secure: false,
    //     rewrite: (path) => path.replace(/^\/api/, ''),
    //   },
    // },
		cors: {
			origin: '*',
			// credentials: true
		}
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
});
