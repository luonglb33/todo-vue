<script setup lang="ts">
import type { Todo } from '../models/Todo';
import { computed } from 'vue';
import { categoryList } from '../constants/constants';

const props = defineProps<{
  todos: Todo[];
  isSelectedAll: boolean;
  category: string;
  onCompletedHandler: (id: string) => void;
  onRemoveTodo: (id: string) => void;
  handleClearComplete: () => void;
  setCategory: (type: string) => void;
}>();

const todoLength = computed(() => {
  return props.todos.filter((item) => !item.isCompleted).length;
});

const completedLength = computed(() => {
  return props.todos.filter((item) => item.isCompleted).length;
});

const hasTodo = computed(() => {
  return props.todos.length > 0;
});
</script>

<template>
  <footer v-if="hasTodo" class="footer">
    <span class="todo-count">
      <strong>{{ todoLength }}</strong>
      <span>{{ todoLength <= 1 ? ' item' : ' items' }}</span>
      <span> left</span>
    </span>
    <ul class="filters">
      <li>
        <a
          :class="{ selected: props.category === categoryList.ALL }"
          @click="() => setCategory(categoryList.ALL)"
          >All</a
        >
      </li>
      <li>
        <a
          :class="{ selected: props.category === categoryList.ACTIVE }"
          @click="() => setCategory(categoryList.ACTIVE)"
          >Active</a
        >
      </li>
      <li>
        <a
          :class="{ selected: props.category === categoryList.COMPLETED }"
          @click="() => setCategory(categoryList.COMPLETED)"
          >Completed</a
        >
      </li>
    </ul>
    <button v-if="completedLength" class="clear-completed" @click="handleClearComplete">
      Clear completed
    </button>
  </footer>
</template>

<style scoped>
.clear-completed,
.clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  outline: none;
}
.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}
.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.filters li a {
  cursor: pointer;
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
  outline: none;
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}
.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li {
  display: inline;
}
.todo-count {
  float: left;
  text-align: left;
}
.footer {
  color: #777;
  padding: 10px 15px;
  height: 40px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 0 9px 1px -3px rgba(0, 0, 0, 0.2),
    0 16px 0 -6px #f6f6f6, 0 17px 2px -6px rgba(0, 0, 0, 0.2);
}
</style>
