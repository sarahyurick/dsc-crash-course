<template>
  <li>
    {{ todo.item }}
    <button v-on:click="$emit('remove', todo.id)">X</button>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      id: Number,
      item: String
    }
  }
};
</script>