// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["@/assets/main.css"],

  modules: [
    // pinia plugin
    "@pinia/nuxt",
    "nuxt-vitest",
    '@nuxtjs/tailwindcss'
  ],

  imports: {
    dirs: ["./stores"],
  },

  pinia: {
    autoImports: ["defineStore", "acceptHMRUpdate"],
  },

  vite: {
    test: {
      globals: true,
      environment: "jsdom",
    },
  },
});
