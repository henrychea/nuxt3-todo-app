
<template>
  <div class="row pt-2">
    <div class="text-left">
      <span class="text-sm text-bold">My List of Tasks ({{ totalTodos }})</span>
      <div class="row pt-1">
        <div class="">
          <div class="btn-primary">
            Complete All
          </div>
        </div>
      </div>
      <AddTask class="py-3" />
      <Transition name="fade">
        <TaskList />
      </Transition>
      <Transition name="fade">
        <div class="row">
          <template
            v-if="prevLinkPage && prevLinkPage !== currentPage"
          >
            <div
              class="row py-2 btn-primary"
              @click="goToPrevPage"
            >
              Previous Page
            </div>
          </template>
          <div class="px-1" />
          <template
            v-if="nextLinkPage"
          >
            <div
              class="row py-2 btn-primary"
              @click="goToNextPage"
            >
              Next Page
            </div>
          </template>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddTask from '../components/AddTask.vue';
import TaskList from '../components/TaskList.vue';
const nextLinkPage = ref(null as number | null)
const prevLinkPage = ref(null as number | null)
const currentPage = ref(null as number | null)
const totalTodos = ref(null as number | null)
const todoStore = useTodo()
todoStore.$subscribe((mutation, state) => {
  nextLinkPage.value = todoStore.nextPage as number
  prevLinkPage.value = todoStore.prevPage as number
  currentPage.value = todoStore.page as number
  totalTodos.value = todoStore.total as number
})

async function goToNextPage() {
  await todoStore.fetchTodos(nextLinkPage.value as number)
}

async function goToPrevPage() {
  await todoStore.fetchTodos(prevLinkPage.value as number)
}

onBeforeMount(async () => {
  await todoStore.fetchTodos();
});

</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(30px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>