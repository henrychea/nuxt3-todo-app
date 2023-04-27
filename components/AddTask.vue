<template>
  <div
    class="row pt-2"
    style="min-width: 60vh;"
  >
    <div class="col px-2 py-3 border-thin bg-white-300 radius-3">
      <div class="row">
        <span class="text-sm">Add New Task</span>
      </div>
      <div class="row pt-1 align-items-center">
        <div class="col pr-3">
          <input
            v-model="taskText"
            class="radius-3 border-thin bg-gray-100"
            style="width: 100%; height: 1.2em;"
            type="text"
          >
        </div>
        <div class="col-4 align-content-end">
          <div
            class="btn-primary align-self-end text-right pr-2"
            @click="addTodo"
          >
            Add Task
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodo } from '../stores/todos';
import { ref } from 'vue'

const todos = useTodo()
const taskText = ref('')
async function addTodo() {
    if (taskText.value === '') {
        return
    }
    await todos.addTodo(taskText.value)
    taskText.value = ''
    await todos.fetchTodos()
}
</script>

<style scoped></style>