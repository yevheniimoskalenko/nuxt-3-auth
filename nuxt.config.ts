// https://nuxt.com/docs/api/configuration/nuxt-config
const { BaseURL } = process.env
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	runtimeConfig: {
		public: {
			BaseURL,
		},
	},
	modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
	pinia: {
		storesDirs: ['./stores/**'],
	},
	devtools: { enabled: true },
})
