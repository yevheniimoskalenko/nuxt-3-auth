import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/user'
const store = useAuthStore()
export default defineNuxtRouteMiddleware(() => {
	const { isAuthenticated } = storeToRefs(store)
	if (isAuthenticated.value) {
		return navigateTo('/')
	}
})
