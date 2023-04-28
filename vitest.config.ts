/// <reference types="vitest/globals" />
import vuePlugin from "@vitejs/plugin-vue";
import { defineVitestConfig } from 'nuxt-vitest/config';

export default defineVitestConfig({
  // plugins: [vuePlugin()],
  test: {
    globals: true,
    environment: 'nuxt'
  },
});
