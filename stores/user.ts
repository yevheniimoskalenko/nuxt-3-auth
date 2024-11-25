import { defineStore } from 'pinia'
export const useAuthStore = defineStore(
	'userStore',
	() => {
		const token = ref<string | null>(null)
		const user = ref({})
		const isAuthenticated = ref<boolean>(false)
		const location = reactive({})
		const setUser = (person) => {
			user.value = person
			return true
		}
		const updateUser = (obj: object) => {
			Object.assign(user.value, obj)
		}
		const getRole = computed(() => user?.value?.role || '')
		const setToken = (accessToken: string) => {
			token.value = accessToken
		}

	

		const setAuthenticated = (user) => {
			isAuthenticated.value = user
		}

		const cleanUser = () => {
			const access = useCookie('access_token')
			const refresh = useCookie('refresh_token')
			access.value = null
			refresh.value = null
			isAuthenticated.value = false
			user.value = null
			token.value = ''
		}

		const getToken = computed(() => token.value)

		return {
			isAuthenticated,
			setUser,
			setToken,
			user,
			location,
			token,
			setAuthenticated,
			cleanUser,
			getRole,
			updateUser,
			getToken,
		}
	},
	{
		persist: true,
	},
)
