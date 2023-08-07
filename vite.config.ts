import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
	plugins: [vue()],
	base: '/memory-vue/',
	resolve: {
		alias: [
			{
				find: '@',
				replacement: fileURLToPath(new URL('./src', import.meta.url)),
			},
		],
	},
})
