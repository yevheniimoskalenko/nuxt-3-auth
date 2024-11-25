import { storeToRefs } from 'pinia'

export default defineNuxtRouteMiddleware(async () => {
	const store = useAuthStore()
	const { isAuthenticated } = storeToRefs(store)
	const accessToken = useCookie('access_token')
	const env = useRuntimeConfig()
	if (accessToken.value && !isAuthenticated.value) {
		try {
			const { data } = await useAsyncData('me', () =>
				$fetch(`${env.public.BaseURL}/api/users/me`, {
					headers: {
						Authorization: `Bearer ${accessToken.value}`,
					},
				}),
			)
			if (data.value) {
				store.setUser(data.value)
				store.setAuthenticated(true)
				store.setToken(data.value.access_token)
			}
		} catch (e) {
			console.error(e)
		}
	}
})
