<template>
  <section>
    <form @submit.prevent="login()">
      <p>{{ errorMsg }}</p>
      <input v-model="credentials.email" type="email" placeholder="Email" />
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  </section>
</template>
<script setup lang="ts">
const { credentials, login, errorMsg } = useLogin({
  credentials: {
    email: "",
    password: "",
  },
});


const { locales, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const env = useRuntimeConfig()
useHead({
	link: locales.value.map(({ code, iso }) => ({
		rel: 'alternate',
		hreflang: iso,
		href: env.public.CLIENT_URL + localePath(route.name.replace(/___[a-z]+/, ''), code),
	})),
})
</script>
