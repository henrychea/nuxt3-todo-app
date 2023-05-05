<template>
  <div style="min-height: 60vh;">
    <Transition name="fade">
      <div
        v-if="!loading && tasks === null"
        class="text-center"
      >
        <span class="text-sm">No Tasks Found</span>
      </div>
    </Transition>
    <div v-if="!loading && tasks !== null">
      <TransitionGroup
        id="taskList"
        name="fade"
        tag="ul"
      >
        <li
          v-for="todo in tasks"
          :id="`task-${todo.id}`"
          :key="todo.id"
          class="px-1 py-2 border-thin bg-white-300 radius-3"
        >
          <div class="row align-items-center">
            <div class="md-auto pr-4">
              <input
                :id="todo.id.toString()"
                type="checkbox"
                @change="handleSelectToggle($event, todo)"
              >
            </div>
            <div class="col md-auto">
              <label
                :class="todo.completed && 'completed-task'"
                :for="todo.id.toString()"
              >{{ todo.title }} : {{ todo.description }}</label>
              <div :class="todo.completed ? `completed-task` : `text-sm text-gray-700`">
                {{ todo.dueDate ? new Date(todo.dueDate).toDateString() : 'No due date' }}
              </div>
            </div>
            
            <div class="col-4 text-right">
              <div
                class="text-sm text-capitalize"
              >
                Priority: {{ todo.priority }}
              </div>
              <div
                :id="`task${todo.id}-actions`"
                class="row justify-content-end"
              >
                <Transition name="fade">
                  <div
                    :data-type="`CompleteTask${todo.id}`"
                    :class="`col pl-4 btn ${todo.completed ? 'text-gray text:hover-gray-900' : 'text-success-500 text:hover-success-600'}`"
                    @click="ToggleTodo(todo)"
                  >
                    {{ todo.completed ? 'Undo' : 'Complete' }}
                  </div>
                </Transition>
                <Transition name="fade">
                  <template v-if="todo.completed">
                    <div
                      :data-type="`DeleteTask${todo.id}`"
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
      </TransitionGroup>
    </div>
    <Transition name="fade">
      <div
        v-if="loading"
        class="text-center"
      >
        <span class="text-sm">Tasks Loading...</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { iTodo } from '~/types';
import { useTodo } from '../stores/todos';
import { ref } from 'vue'

const todoStore = useTodo()
const tasks = ref(null as iTodo[] | null)
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})


todoStore.$subscribe((mutation, state) => {
  tasks.value = todoStore.todos as iTodo[]
})


async function ToggleTodo(todo: iTodo) {
  await todoStore.toggleTodo(todo.id)
  await todoStore.fetchTodos()
}

async function DeleteTodo(todo: iTodo) {
  await todoStore.removeTodo(todo.id)
  await todoStore.fetchTodos()
}

function handleSelectToggle(event: any, todo: iTodo) {
  if (event.target.checked) {
    todoStore.selectTodo(todo)
  } else {
    todoStore.unselectTodo(todo)
  }
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