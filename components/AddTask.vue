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
          <div class="row pt-1">
            <label for="taskText">
              Title:
            </label>
            <input
              id="taskText"
              v-model="taskText"
              class="radius-3 border-thin bg-gray-100"
              style="width: 100%; height: 1.2em;"
              type="text"
            >
          </div>
          <div class="row pt-1">
            <label for="taskDescription">
              Description:
            </label>
            <input
              id="taskDescription"
              v-model="taskDescription"
              type="textDescription"
              class="radius-3 border-thin bg-gray-100"
              style="width: 100%; height: 1.2em;"
            >
          </div>
          <div class="row pt-1">
            <label for="taskPriority">
              Priority:
            </label>
            <select
              id="taskPriority"
              v-model="taskPriority"
              class="radius-3 border-thin bg-gray-100"
              style="width: 100%; height: 2em;"
            >
              <option value="low">
                Low
              </option>
              <option value="medium">
                Medium
              </option>
              <option value="high">
                High
              </option>
            </select>
          </div>
          <div class="row pt-1">
            <label for="taskDueDate">
              Due Date:
            </label>
            <input
              id="taskDueDate"
              v-model="taskDueDate"
              placeholder="dd/mm/yyyy"
              type="text"
              class="radius-3 border-thin bg-gray-100"
              style="width: 100%; height: 1.2em;"
              @change="checkDateFormat()"
            >
          </div>
        </div>
        <div class="col-4 align-content-end">
          <div
            data-target="AddTask"
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
import {iBaseTodo} from '@/types'

const todos = useTodo()
const taskText = ref('')
const taskDescription = ref('')
const taskPriority = ref<iBaseTodo['priority']>('low')
const taskDueDate = ref('')

function checkDateFormat(){
  const dateRegex = new RegExp(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)
  if (!dateRegex.test(taskDueDate.value)) {
    window.alert('Please enter a valid date in the format dd/mm/yyyy')
    taskDueDate.value = ''
  }
}

async function addTodo() {
    if (taskText.value === '' && taskDescription.value === '' && taskDueDate.value === '' ) {
        return
    }
    const newTodo : iBaseTodo = {
        title: taskText.value,
        description: taskDescription.value,
        priority: taskPriority.value,
        dueDate: taskDueDate.value,
        completed: false
    }
    await todos.addTodo(newTodo)
    taskText.value = ''
    taskDescription.value = ''
    taskPriority.value = 'low'
    taskDueDate.value = ''
    await todos.fetchTodos()
}
</script>

<style scoped></style>