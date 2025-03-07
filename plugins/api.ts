import { ofetch } from 'ofetch'

export default defineNuxtPlugin((_nuxtApp) => {
	const { $auth } = useNuxtApp()
	const env = useRuntimeConfig()
	const BaseURL = env.public.BaseURL
	const $api = ofetch.create({
		credentials: 'include',
		baseURL: BaseURL,
		async onRequest({ options }) {},
		async onResponseError({ response }) {
			if (response.status === 401) {
				await $auth.refreshTokens()
			}
			return Promise.reject({
				status: response.status,
				message: response._data?.message || 'Unknown error',
			})
		},
	})
	globalThis.$api = $api
})
