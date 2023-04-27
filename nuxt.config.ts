// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
  },
  pages: true,
  css: [
    '@/assets/css/global.css',
    '@/assets/scss/global.scss'
  ],
  
});
