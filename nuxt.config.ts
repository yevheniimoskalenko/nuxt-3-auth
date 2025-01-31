const { BaseURL, ServerUrl } = process.env
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	runtimeConfig: {
		public: {
			BaseURL,
		},
	},
	modules: ['@pinia/nuxt', '@trandaison/nuxt-3-auth'],
	pinia: {
		storesDirs: ['./stores/**'],
	},
	auth: {
		endpoints: {
			baseUrl: BaseURL, //client url
			login: { url: ServerUrl + '/api/auth/sign-in', method: 'POST', property: 'data' },
			logout: { url: ServerUrl + '/api/auth/logout', method: 'GET' },
			refresh: { url: ServerUrl + '/api/auth/refresh', method: 'GET', property: 'data' },
			user: { url: ServerUrl + '/api/users/me', method: 'GET', property: 'data' },
			signup: { url: ServerUrl + '/api/auth/sign-up', method: 'POST' },
		},
		token: {
			headerName: 'Authorization',
			property: 'tokens.access_token',
			maxAge: 15 * 60 * 1000,
			type: 'Bearer',
		},
		refreshToken: {
			property: 'tokens.refresh_token',
			maxAge: 30 * 24 * 60 * 60 * 1000,
			paramName: 'token',
		},
		rewriteRedirects: true,
		debug: false,
	},
	devtools: { enabled: true },
})
