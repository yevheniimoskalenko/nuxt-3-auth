<template>
	<section>
		<form @submit.prevent="signIn">
			<input
				v-model="email"
				type="email"
				placeholder="Email"
			/>
			<input
				v-model="password"
				type="password"
				placeholder="Password"
			/>
			<button type="submit">Login</button>
		</form>
	</section>
</template>
<script setup lang="ts">
const { setUser, setAuthenticated, setToken } = useAuthStore()
const email = ref('')
const password = ref('')
const accessToken = useCookie('access_token', { maxAge: 60 * 60 * 15 })
const refreshToken = useCookie('refresh_token', { maxAge: 3600 * 24 * 30 })
// definePageMeta({
// 	middleware: 'guest',
// })
const signIn = async (values: SignUp) => {
	try {
		const data = await $api(`/api/auth/sign-in`, {
			method: 'POST',
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		setUser(data)
		accessToken.value = data.access_token
		refreshToken.value = data.refresh_token
		setToken(data.access_token)
		setAuthenticated(true)
		navigateTo({ name: 'secret' })
	} catch (err) {
		console.error(err)
	}
}
</script>
