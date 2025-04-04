// https://nuxt.com/docs/api/configuration/nuxt-config
const { NODE_ENV = "production", BaseURL, CLIENT_URL } = process.env;

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      BaseURL,
      CLIENT_URL,
    },
  },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@trandaison/nuxt-3-auth",
    "@nuxtjs/i18n",
  ],
  i18n: {
    vueI18n: "i18n.config.ts",
    locales: [
      {
        code: "ua",
        title: "Українська",
        files: ["ua.ts"],
        iso: "uk-UA",
      },
      {
        code: "en",
        file: "en.ts",
        title: "English",
        iso: "en-US",
      },
      {
        code: "fr",
        file: "fr.ts",
        title: "Français",
        iso: "fr-FR",
      },
    ],
    defaultLocale: "ua",
  },
  auth: {
    endpoints: {
      baseUrl: CLIENT_URL, //client url
      login: {
        url: BaseURL + "/api/auth/sign-in",
        method: "POST",
        property: "data",
      },
      logout: { url: BaseURL + "/api/auth/logout", method: "GET" },
      refresh: {
        url: BaseURL + "/api/auth/refresh",
        method: "GET",
        property: "data",
      },
      user: { url: BaseURL + "/api/users/me", method: "GET", property: "data" },
      signup: { url: BaseURL + "/api/auth/sign-up", method: "POST" },
    },
    redirect: {
      login: "/",
    },
    token: {
      headerName: "Authorization",
      property: "tokens.access_token",
      maxAge: 15 * 60 * 1000,
      type: "Bearer",
    },
    refreshToken: {
      property: "tokens.refresh_token",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      paramName: "token",
    },
    rewriteRedirects: true,
    useI18n: true,
    debug: true,
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
});
