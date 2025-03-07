<script setup lang="ts">
const auth = useAuth()
const credentials = reactive({
	email: '',
	password: '',
	firstName: '',
	lastName: '',
	phoneNumber: '',
})
definePageMeta({
	auth: 'guest',
})

const signUp = async () => {
	try {
		const res = await $api('/api/auth/sign-up', {
			method: 'POST',
			body: JSON.stringify({
				email: credentials.email,
				password: credentials.password,
				firstName: credentials.firstName,
				lastName: credentials.lastName,
				phoneNumber: credentials.phoneNumber.replace(/[() ]*/gi, ''),
				role: 'PLAYER',
				tariff: '1',
			}),
		})
		auth.storage.setAuth({ token: res.access_token, refresh_token: res.refresh_token })
		auth.storage.setPersistent(true)
		// auth.storage.setUser(res.user) // if you have user info get with sign up, you can use that, or if you don't have user info use await auth.fetchUser()
		await auth.fetchUser()
		auth.setReferer(null)
		navigateTo('/private')
	} catch (err) {
		console.error(err)
	}
}
</script>
<template>
	<section>
		<form @submit.prevent="signUp">
			<input
				v-model="credentials.email"
				type="email"
				placeholder="Email"
			/>
			<input
				v-model="credentials.password"
				type="password"
				placeholder="Password"
			/>
			<input
				v-model="credentials.firstName"
				type="text"
				placeholder="firstName"
			/>
			<input
				v-model="credentials.lastName"
				type="text"
				placeholder="lastName"
			/>
			<input
				v-model="credentials.phoneNumber"
				type="text"
				placeholder="phoneNumber"
			/>
			<button type="submit">Sign up</button>
		</form>
	</section>
</template>
