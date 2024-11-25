import { storeToRefs } from 'pinia'

const user = useAuthStore()
const { isAuthenticated } = storeToRefs(user)
export default defineNuxtRouteMiddleware(() => {
	if (!isAuthenticated.value) {
		return navigateTo('/')
	}
})
