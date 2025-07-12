<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <main>
      <slot />
    </main>
  </Html>
</template>
<script setup lang="ts">
import { useOneTap, type CredentialResponse } from "vue3-google-signin";
const auth = useAuth();
const { $auth } = useNuxtApp();
const { user, loggedIn } = $auth;
const head = useLocaleHead();
useOneTap({
  disableAutomaticPrompt: loggedIn.value,
  onSuccess: async (response: CredentialResponse) => {
    try {
      const res = await $api("/api/auth/google-one-tap", {
        method: "POST",
        body: response as CredentialResponse,
      });
      auth.storage.setAuth({
        token: res.access_token,
        refresh_token: res.refresh_token,
      });
      auth.storage.setPersistent(true);
      auth.storage.setUser({ ...res.user, token: res.access_token }); // if you have user info get with sign up, you can use that, or if you don't have user info use await auth.fetchUser()
      auth.setReferer(null);
      await navigateTo("/private");
    } catch (err) {
      console.error(err);
    }
  },
  onError: () => console.error("Error with One Tap Login"),
});
</script>
