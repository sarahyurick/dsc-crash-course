<template>
  <md-list-item>
    {{todo.edit}}
    <md-field v-if="todo.edit">
      <label>Task</label>
      <md-input v-model="todo.item" v-on:keydown.enter="$emit('edit', todo.id)"></md-input>
    </md-field>

    <strong v-if="!todo.edit">{{ todo.item }}</strong>
    <span>
      <md-button
        v-if="!todo.edit"
        class="md-icon-button md-success md-raised"
        v-on:click="todo.edit = true"
      >
        <md-icon>edit</md-icon>
      </md-button>
      <md-button class="md-icon-button md-accent md-raised" v-on:click="$emit('remove', todo.id)">
        <md-icon>delete</md-icon>
      </md-button>
    </span>
  </md-list-item>
</template>

<script>
export default {
  props: {
    todo: {
      id: Number,
      item: String,
      edit: false
    }
  }
};
</script>