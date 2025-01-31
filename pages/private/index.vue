<script setup>
definePageMeta({ auth: true })
const { $auth } = useNuxtApp()
const { user } = $auth
const { doLogout } = useLogout()
</script>

<template>
	<div>
		<button @click="doLogout()">Logout</button>
		{{ user }}
		<p>This page is private, you can only see it if you are logged in.</p>
	</div>
</template>
