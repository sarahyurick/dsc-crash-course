<template>
  <div>
    <input v-model="newTodoText" placeholder="New Task" v-on:keydown.enter="addTodo" />
    <ol v-if="todos.length">
      <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" @remove="removeTodo" />
    </ol>
    <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";

let nextTodoId = 0;
let placeholderTodos = [
  {
    id: nextTodoId++,
    text: "Learn Vue"
  },
  {
    id: nextTodoId++,
    text: "Learn about single-file components"
  },
  {
    id: nextTodoId++,
    text: "Fall in love"
  }
];
export default {
  components: {
    // BaseInputText,
    TodoListItem
  },
  data() {
    return {
      newTodoText: "",
      todos: placeholderTodos
    };
  },
  methods: {
    addTodo() {
      // trim() will convert '  abcde  ' -> 'abcde'
      // basic error handling, since we don't want unnecessary whitespace
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        this.todos.push({
          id: nextTodoId++,
          text: trimmedText
        });
        this.newTodoText = "";
      }
    },
    removeTodo(idToRemove) {
      // filter() runs a function (usually a lambda) on each element of a list
      // it returns a list of items where the function returns true
      this.todos = this.todos.filter(todo => {
        return todo.id !== idToRemove;
      });
    }
  }
};
</script>