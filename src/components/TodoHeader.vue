<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const props = defineProps<{
  addTodo: (todoText: string) => void;
}>();

const newTodo: Ref<string> = ref('');
function handleAdd() {
  const newTodoText = newTodo.value.trim();
  if (newTodoText) {
    props.addTodo(newTodoText);
    newTodo.value = '';
  }
}
</script>

<template>
  <header class="header">
    <h1>todos</h1>
    <input
      class="new-todo"
      placeholder="What needs to be done?"
      v-model="newTodo"
      @keyup.enter="handleAdd" />
  </header>
</template>

<style scoped>
.new-todo {
  width: 100%;
  outline: none;
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-size: 24px;
}
</style>
