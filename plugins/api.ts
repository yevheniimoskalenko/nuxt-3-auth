import { ofetch } from 'ofetch'
import { storeToRefs } from 'pinia'
export default defineNuxtPlugin((_nuxtApp) => {
	const store = useAuthStore()
	const {start, finish} = useLoadingIndicator()
	const { setUser, setAuthenticated, setToken } = store
	const { getToken } = storeToRefs(store)
	const accessToken = useCookie('access_token', { maxAge : 60*60*15})
	const refreshToken = useCookie('refresh_token', { maxAge : 3600*24*30})
	const i18nRedirected = useCookie('i18n_redirected')
	const lang = i18nRedirected.value
	const env = useRuntimeConfig()
	const BaseURL = env.public.BaseURL
	globalThis.$api = ofetch.create({
		credentials: 'include',
		baseURL: BaseURL,
		async onRequest({ options }) {
			start()
			if (lang) {
				options.headers = { 'Accept-Language': lang === 'uk' ? 'ua' : lang }
			}
			if (getToken.value) {
				options.headers = { Authorization: `Bearer ${getToken.value}` }
			}
		},
		async onResponseError({ response, request, options }) {
			if (response.status === 401) {
				const refreshResponse = await ofetch(`${BaseURL}/api/auth/refresh/`, {
						method: 'GET',
						credentials: 'include',
						headers: {
							refresh: refreshToken.value
						}
				})
				setAuthenticated(true)
				accessToken.value = refreshResponse.access_token
				refreshToken.value = refreshResponse.refresh_token
				setUser({...refreshResponse, ...refreshResponse.user})
				setToken(refreshResponse.access_token)
				return await ofetch(request, options)
			}
		},
		onResponse() {
			finish()
		}
	})
})
