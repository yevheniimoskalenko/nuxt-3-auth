<template>
  <section>
    <button
      :disabled="!isReady"
      :loading="!isReady"
      @click="() => loginGoogle()"
    >
      <span> google auth </span>
    </button>
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
import {
  useTokenClient,
  type AuthCodeFlowSuccessResponse,
  type AuthCodeFlowErrorResponse,
} from "vue3-google-signin";
const { credentials, login, errorMsg } = useLogin({
  credentials: {
    email: "",
    password: "",
  },
});
const auth = useAuth();
const { locales, t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const env = useRuntimeConfig();
useHead({
  link: locales.value.map(({ code, iso }) => ({
    rel: "alternate",
    hreflang: iso,
    href:
      env.public.CLIENT_URL +
      localePath(route.name.replace(/___[a-z]+/, ""), code),
  })),
});
const handleOnSuccess = async (response: AuthCodeFlowSuccessResponse) => {
  try {
    const res = await $api("/api/auth/google", {
      method: "POST",
      body: response,
    });
    auth.storage.setAuth({
      token: res.access_token,
      refresh_token: res.refresh_token,
    });
    auth.storage.setPersistent(true);
    await auth.fetchUser();
    auth.setReferer(null);
    navigateTo("/private");
  } catch (e) {
    console.error(e.message);
  }
};
const handleOnError = (errorResponse: AuthCodeFlowErrorResponse) => {
  console.log(errorResponse);
};

const { isReady, login: loginGoogle } = useTokenClient({
  onSuccess: handleOnSuccess,
  onError: handleOnError,
});
</script>
