<template>
  <div>
    <span style="display: flex; flex-flow: row-wrap">
      <md-field>
        <label>New Task</label>
        <md-input v-model="newTodoText" v-on:keydown.enter="addTodo" />
      </md-field>
      <md-button class="md-icon-button md-primary md-raised" v-on:click="addTodo">
        <md-icon>send</md-icon>
      </md-button>
    </span>
    <md-list v-if="todos.length">
      <TodoListItem v-for="todo in todos" :key="todo.id" :todo="todo" v-on:remove="removeTodo" />
    </md-list>
    <p v-else>Nothing left in the list. Add a new todo in the input above.</p>
  </div>
</template>

<script>
import TodoListItem from "./TodoListItem.vue";

let nextTodoId = 0;
let placeholderTodos = [];

const API_BASE = "http://localhost:3000";

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
    async refresh() {
      // make a GET request to receive new items from other clients
      this.$http.get(`${API_BASE}/todolist`).then(
        res => {
          console.log(res);
          this.todos = res.body;
        },
        err => {
          console.err(err);
          alert("Could not reach database");
        }
      );
    },
    addTodo() {
      // trim() will convert '  abcde  ' -> 'abcde'
      // basic error handling, since we don't want unnecessary whitespace
      const trimmedText = this.newTodoText.trim();
      if (trimmedText) {
        // make a POST request to /todolist that will add the taskId and task
        this.$http
          .post(`${API_BASE}/todolist`, {
            id: nextTodoId,
            item: trimmedText
          })
          .then(
            success => {
              console.log(success);
              this.refresh();
              this.newTodoText = "";
            },
            failure => {
              console.err(failure);
              alert("Update Failed");
            }
          );
      }
    },
    removeTodo(idToRemove) {
      // filter() runs a function (usually a lambda) on each element of a list
      // it returns a list of items where the function returns true
      this.$http.delete(`${API_BASE}/todolist/${idToRemove}`).then(
        success => {
          console.log(success);
          this.refresh();
        },
        failure => {
          console.error(failure);
          alert("Could not delete");
        }
      );
    }
  },
  beforeMount() {
    this.refresh();
  }
};
</script>