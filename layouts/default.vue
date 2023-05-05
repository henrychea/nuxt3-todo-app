<template>
  <div class="h-100 bg-blue-950">
    <div class="flex-row justify-content-center">
      <header class="px-1 pb-1 pt-5 text-left">
        <div>
          <h1>Simple Todo App</h1>
          <h4>With Pinia Support🍍</h4>
          <template v-if="route.path !== '/'">
            <h5>
              <router-link to="/">
                → Back Home
              </router-link>
            </h5>
            <hr>
          </template>
        </div>
      </header>
    </div>
    <div class="flex-row justify-content-center">
      <main
        style="min-height: 40vh; max-height: 100vh; overflow: scroll;"
        class="p-1"
      >
        <slot />
      </main>
    </div>
    <div class="flex-row">
      <footer class="text-center text-gray pt-4">
        <div>
          <div>
            Simple Todo App
          </div>by
          <a href="https://henrychea.com">@henrychea</a> 2023
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<style>
/* Transistions */


.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(30px);
  opacity: 0;
}


</style>