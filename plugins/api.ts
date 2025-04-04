import { ofetch } from "ofetch";

export default defineNuxtPlugin((_nuxtApp) => {
  const { $auth } = useNuxtApp();
  const { loggedIn, user } = $auth;
  const accessToken = useCookie("auth.access_token");
  const i18nRedirected = useCookie<string>("i18n_redirected");
  const lang = i18nRedirected.value || "ua";
  const env = useRuntimeConfig();
  const BaseURL = env.public.BaseURL;

  const $api = ofetch.create({
    credentials: "include",
    baseURL: BaseURL,
    async onRequest({ options }) {
      console.log(user.value);
      options.headers = {
        Authorization: loggedIn.value
          ? `Bearer ${user.value?.token || accessToken.value}`
          : "",
        "Accept-Language": lang === "uk" ? "ua" : lang,
      };
    },
    async onResponseError({ response, request, options }) {
      // if (response.status === 401 && !options?._isRetry) {
      //   options._isRetry = true;
      //   try {
      //     const res = await $auth.refreshTokens();
      //     accessToken.value = res.token;
      //     await ofetch(request, options);
      //   } catch (e) {
      //     console.error("Failed to refresh token:", e);
      //   }
      // }
      return Promise.reject({
        status: response.status,
        message: response._data?.message || "Unknown error",
      });
    },
  });

  globalThis.$api = $api;
});
