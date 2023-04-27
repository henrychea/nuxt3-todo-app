<template>
  <div style="min-height: 60vh;">
    <Transition name="fade">
      <template v-if="tasks === null || tasks.length === 0">
        <div class="text-center">
          <span class="text-sm">No Tasks Found</span>
        </div>
      </template>
      <template v-else>
        <ul>
          <li
            v-for="todo in tasks"
            :key="todo.id"
            class="px-1 py-2 border-thin bg-white-300 radius-3"
          >
            <div class="row align-items-center">
              <div class="md-auto pr-4">
                <input
                  :id="todo.id.toString()"
                  type="checkbox"
                  :checked="todo.isComplete"
                  @change="selectedTasks.push(todo)"
                >
              </div>
              <div class="col md-auto">
                <label
                  :class="todo.isComplete && 'completed-task'"
                  :for="todo.id.toString()"
                >{{ todo.text }}</label>
              </div>
              <div>
                <div class="row justify-content-end">
                  <Transition name="fade">
                    <div
                      class="col pl-4 btn text-gray"
                      @click="ToggleTodo(todo)"
                    >
                      {{ todo.isComplete ? 'Undo' : 'Complete' }}
                    </div>
                  </Transition>
                  <Transition name="fade">
                    <template v-if="todo.isComplete">
                      <div
                        class="col pl-4 btn-danger text-gray"
                        @click="DeleteTodo(todo)"
                      >
                        Delete
                      </div>
                    </template>
                  </Transition>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { iTodo } from '~/types';
import { useTodo } from '../stores/todos';
import { ref } from 'vue'

const todoStore = useTodo()
const tasks = ref([] as iTodo[])
todoStore.$subscribe((mutation, state) => {
  tasks.value = todoStore.todos as iTodo[]

  console.log('mutation', mutation, 'state', state)
})

const selectedTasks = ref([] as iTodo[])

async function ToggleTodo(todo: iTodo) {
  await todoStore.toggleTodo(todo.id)
  await todoStore.fetchTodos()
}

async function DeleteTodo(todo: iTodo) {
  await todoStore.removeTodo(todo.id)
  await todoStore.fetchTodos()
}

</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>