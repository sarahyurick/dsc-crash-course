<template>
  <md-list-item>
    {{ todo.item }}
    <md-button class="md-icon-button md-accent md-raised" v-on:click="$emit('remove', todo.id)">
      <md-icon>delete</md-icon>
    </md-button>
  </md-list-item>
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