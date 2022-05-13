<script setup lang="ts">
import type { Todo } from '../models/Todo';
import { ref, watchEffect } from 'vue';

const props = defineProps<{
  todo: Todo;
  isCompleted: boolean;
  onCompletedHandler: (id: string) => void;
  onRemoveTodo: (id: string) => void;
  editTodo: (id: string, value: string) => void;
}>();

const editTodoEl = ref<HTMLInputElement | null>(null);
const editTodo = ref<string>(props.todo.value);
const isEditTodo = ref(false);
watchEffect(() => {
  editTodoEl.value?.focus();
});
function handleEditTodo(id: string) {
  if (editTodo.value) {
    props.editTodo(id, editTodo.value);
    isEditTodo.value = false;
  }
}
</script>

<template>
  <input
    v-if="isEditTodo"
    ref="editTodoEl"
    v-model="editTodo"
    @blur="() => handleEditTodo(todo.id)"
    @keyup.enter="() => handleEditTodo(todo.id)"
    class="edit" />
  <div class="view" v-else>
    <input
      type="checkbox"
      :v-model="todo.isCompleted"
      :checked="todo.isCompleted"
      class="toggle"
      @input="props.onCompletedHandler(todo.id)" />
    <label @dblclick="isEditTodo = !isEditTodo">{{ todo.value }}</label>
    <button class="destroy" @click="props.onRemoveTodo(todo.id)" />
  </div>
</template>
<style>
.edit {
  display: inline-block;
  position: relative;
  width: 100%;
  outline: none;
  border: 1px solid #999;
  width: 100%;
  padding: 16px 6px;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
  font-size: 24px;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
