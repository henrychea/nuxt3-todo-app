
<template>
  <div class="row pt-2">
    <div class="text-left">
      <span
        id="title"
        class="text-sm text-bold"
      >My List of Tasks {{ totalTodos && `(${totalTodos})` }}</span>
      <div
        v-if="!noServer"
        class="row align-items-center align-self-center justify-content-space-between mt-2"
        style="height: 2vh;"
      >
        <Transition name="fade">
          <div :class="numberOfSelectedTodos ? 'col-3': 'col'">
            <div
              v-if="numberOfSelectedTodos === 0"
              data-target="CompleteAllTasks"
              class="btn-primary text-gray-900"
              @click="CompleteAllTasks"
            >
              Complete All
            </div>
            <div
              v-else
              data-target="CompleteAllTasks"
              class="btn-primary "
              @click="CompleteSelectedTodos"
            >
              Complete Selected
            </div>
          </div>
        </Transition>
        <Transition name="fade">
          <div
            v-if="numberOfSelectedTodos > 0"
            class="col"
          >
            <div
              v-if="numberOfSelectedTodos > 0"
              data-target="RemoveSelectedTodos"
              class="btn-danger"
              @click="RemoveSelectedTodos"
            >
              Remove Selected
            </div>
          </div>
        </Transition>
        <div class="col">
          <Transition name="slide">
            <div
              v-if="numberOfSelectedTodos > 0"
              id="selectedTasks"
              class="text-sm text-right"
            >
              Selected Todos ({{ numberOfSelectedTodos }})
            </div>
          </Transition>
        </div>
      </div>
      <AddTask 
        v-if="!noServer"
        class="py-3"
      />
      <TaskList
        v-if="!noServer"
        :loading="loading"
      />
      <div v-if="noServer">
        Failed to connect to server
      </div>
      <Transition name="fade">
        <div class="row">
          <template v-if="prevLinkPage && prevLinkPage !== currentPage">
            <div
              data-target="goToPrevPage"
              class="row py-2 btn-primary"
              @click="goToPrevPage"
            >
              Previous Page
            </div>
          </template>
          <div class="px-1" />
          <template v-if="nextLinkPage">
            <div
              data-target="goToNextPage"
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
const numberOfSelectedTodos = ref(0)
const todoStore = useTodo()
const noServer = ref(false)

const loading = ref(false)
todoStore.$subscribe((mutation, state) => {
  nextLinkPage.value = todoStore.nextPage as number
  prevLinkPage.value = todoStore.prevPage as number
  currentPage.value = todoStore.page as number
  totalTodos.value = todoStore.total as number
  numberOfSelectedTodos.value = todoStore.selectedTodos.length
})

async function CompleteAllTasks() {
  loading.value = true
  await todoStore.completeAllTodos()
  await todoStore.fetchTodos();
  loading.value = false
}

async function CompleteSelectedTodos() {
  loading.value = true
  await todoStore.completeSelectedTodos()
  await todoStore.fetchTodos();
  loading.value = false
}

async function RemoveSelectedTodos() {
  loading.value = true
  await todoStore.removeSelectedTodos()
  await todoStore.fetchTodos();
  loading.value = false
}

async function goToNextPage() {
  loading.value = true
  await todoStore.fetchTodos(nextLinkPage.value as number)
  loading.value = false
}

async function goToPrevPage() {
  loading.value = true
  await todoStore.fetchTodos(prevLinkPage.value as number)
  loading.value = false
}

onBeforeMount(async () => {
  loading.value = true
  try {
    await todoStore.fetchTodos();
  } catch (error) {
    noServer.value = true
    console.error(error)
  }
  loading.value = false
});

</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(30px);
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