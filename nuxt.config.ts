// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@/assets/scss/global.scss'
  ],
  modules: [
    // pinia plugin
    '@pinia/nuxt',
  ],

  imports: {
    dirs: ['./stores'],
  },

  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  }, 
});
