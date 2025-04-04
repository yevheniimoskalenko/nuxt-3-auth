<script setup lang="ts">
const error = ref("");
const auth = useAuth();
const credentials = reactive({
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
});
definePageMeta({
  auth: "guest",
});

const signUp = async () => {
  try {
    const res = await $api("/api/auth/sign-up", {
      method: "POST",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        phoneNumber: credentials.phoneNumber.replace(/[() ]*/gi, ""),
      }),
    });
    auth.storage.setAuth({
      token: res.access_token,
      refresh_token: res.refresh_token,
    });
    auth.storage.setPersistent(true);
    auth.storage.setUser({ ...res.user, token: res.data.access_token }); // if you have user info get with sign up, you can use that, or if you don't have user info use await auth.fetchUser()
    auth.setReferer(null);
    navigateTo("/private");
  } catch (err) {
    error.value = err.message;
    console.error(err);
  }
};
</script>
<template>
  <section>
    <span v-if="error">{{ error }}</span>
    <form @submit.prevent="signUp">
      <input v-model="credentials.email" type="email" placeholder="Email" />
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
