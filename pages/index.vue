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
</script>
