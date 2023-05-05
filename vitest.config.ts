/// <reference types="vitest/globals" />
import { defineVitestConfig } from 'nuxt-vitest/config';

export default defineVitestConfig({
  test: {
    globals: true,
    environment: 'nuxt'
  },
});
