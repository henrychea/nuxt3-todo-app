import { iTodo } from "~/types";
import { defineStore } from "pinia";
import { randomUUID } from "crypto";

function makePageLinks(links: string[]){
  const nextLink = links[1].split(';')[0].replace('<', '').replace('>', '');
  const prevLink = links[0].split(';')[0].replace('<', '').replace('>', '');
  const lastLink = links[2].split(';')[0].replace('<', '').replace('>', '');

  const nextLinkPage = nextLink.split('&')[0].split('=')[1];
  const prevLinkPage = prevLink.split('&')[0].split('=')[1];
  const lastLinkPage = lastLink.split('&')[0].split('=')[1];
  return { nextLinkPage, prevLinkPage, lastLinkPage };
}

export const useTodo = defineStore("todo", {
  state: () => ({
    todos: [] as iTodo[],
    selectedTodos: [] as iTodo[],
    nextPage: 0,
    prevPage: 0,
    lastPage: 0,
    page : 1,
    total : 0,
  }),

  getters: {
    async completedTodos() {
      const completedTodos: iTodo[] = await fetch(
        "http://localhost:3004/todos?isComplete=true"
      ).then((res) => res.json());
      return completedTodos;
    },
    async activeTodos() {
      const activeTodos: iTodo[] = await fetch(
        "http://localhost:3004/todos?isComplete=false"
      ).then((res) => res.json());
      return activeTodos;
    },
  },

  actions: {
    async fetchTodos(setPage: number = 1,limit: number = 10) {
      const res = await fetch(
        `http://localhost:3004/todos?_page=${setPage}&_limit=${limit}`
      );
      if (setPage !== this.page) this.page = setPage;
      const link = res.headers.get("link");
      const total = res.headers.get("x-total-count");
      this.total = Number(total);
      this.todos = await res.json();
      if (link) {
        const links = link.split(",");
        const { nextLinkPage, prevLinkPage, lastLinkPage } = makePageLinks(links);
        this.nextPage = parseInt(nextLinkPage);
        this.prevPage = parseInt(prevLinkPage);
        this.lastPage = parseInt(lastLinkPage);
      }
    },

    selectTodo(todo: iTodo) {
      this.selectedTodos.push(todo);
    },

    unselectTodo(todo: iTodo) {
      if (this.selectedTodos.length === 0) return;
      this.selectedTodos = this.selectedTodos.filter((t) => t.id !== todo.id);
    },

    async completeSelectedTodos() {
      if (this.selectedTodos.length === 0) return;
      await Promise.all(
        this.selectedTodos.map(async (todo) => {
          const res = await fetch(`http://localhost:3004/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isComplete: true,
            }),
          });
          console.info("Complete selected todos", res);
        })
      );
      this.selectedTodos = [];
    },

    async removeSelectedTodos() {
      if (this.selectedTodos.length === 0) return;
      await Promise.all(
        this.selectedTodos.map(async (todo) => {
          const res = await fetch(`http://localhost:3004/todos/${todo.id}`, {
            method: "DELETE",
          });
          console.info("Remove selected todos", res);
        })
      );
      this.selectedTodos = [];
    },

    async addTodo(text: string) {
      await fetch("http://localhost:3004/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: randomUUID,
          text,
          isComplete: false,
        }),
      });
    },

    async updateTodo(id: number, text: string) {
      await fetch(`http://localhost:3004/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });
    },

    async toggleTodo(id: number) {
      await fetch(`http://localhost:3004/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isComplete: !this.todos.find((todo) => todo.id === id)?.isComplete,
        }),
      });
    },

    async removeTodo(id: number) {
      await fetch(`http://localhost:3004/todos/${id}`, {
        method: "DELETE",
      });
    },

    async completeAllTodos() {
      const completedTodos = this.todos;
      await Promise.all(
        completedTodos.map(async (todo) => {
          const res = await fetch(`http://localhost:3004/todos/${todo.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              isComplete: true,
            }),
          });
          console.info("Complete all todos", res);
        })
      );
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTodo, import.meta.hot));
}
