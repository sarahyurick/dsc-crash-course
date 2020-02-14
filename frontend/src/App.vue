<template>
  <div id="app">
    <h1>Tasks</h1>
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";

export default {
  components: {
    TodoList
  }
};
</script>

<style>
#app {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
}
</style>