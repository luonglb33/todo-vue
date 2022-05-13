<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import type { Ref } from 'vue';
import Header from './components/TodoHeader.vue';
import TodoList from './components/TodoList.vue';
import Footer from './components/TodoFooter.vue';
import type { Todo } from './models/Todo';
import { categoryList, todoKey } from './constants/constants';
import _ from 'lodash';

const todos: Ref<Todo[]> = ref([]);
const category: Ref<string> = ref(categoryList.ALL);
const isSelectedAll: Ref<boolean> = ref(false);

function addTodo(todoText: string): void {
  const newId: string = new Date().getTime().toString() + Math.ceil(Math.random() * 1000);
  const newTodo: Todo = { id: newId, value: todoText, isCompleted: false };
  todos.value.push(newTodo);
}

function onCompletedHandler(id: string) {
  todos.value = todos.value.map((item: Todo) => {
    return item.id === id ? { ...item, isCompleted: !item.isCompleted } : item;
  });
}

function onRemoveTodo(id: string) {
  todos.value = todos.value.filter((item: Todo) => item.id !== id);
}

function editTodo(id: string, value: string) {
  todos.value = todos.value.map((item: Todo) => {
    return item.id === id ? { ...item, value } : item;
  });
}

function handleSelectAll() {
  isSelectedAll.value = !isSelectedAll.value;
  console.log(' isSelectedAll.value ', isSelectedAll.value);
  const updatedList = todos.value.map((item: Todo) => {
    return { ...item, isCompleted: isSelectedAll.value };
  });
  console.log('updatedList', updatedList);
  todos.value = updatedList;
}

function handleClearComplete() {
  todos.value = todos.value.filter((item: Todo) => !item.isCompleted);
}

function setCategory(type: string) {
  console.log(type);
  category.value = type;
}

watch(
  () => todos.value,
  () => {
    console.log('Update the localStorage');
    const completedList = todos.value.filter((item) => item.isCompleted);
    isSelectedAll.value = todos.value.length === completedList.length;
    localStorage.setItem(todoKey, JSON.stringify(todos.value));
  },
  { deep: true },
);

onMounted(() => {
  if (localStorage.getItem(todoKey)) {
    const storageObject: Todo[] = JSON.parse(localStorage.getItem(todoKey) || '{}');
    console.log({ storageObject, todos: JSON.parse(JSON.stringify(todos.value)) });
    if (!_.isEqual(JSON.parse(JSON.stringify(todos.value)), storageObject)) {
      todos.value = storageObject;
    }
  }
});
</script>

<template>
  <div class="todoapp">
    <Header :add-todo="addTodo"></Header>
    <TodoList
      :todos="todos"
      :category="category"
      :on-completed-handler="onCompletedHandler"
      :on-remove-todo="onRemoveTodo"
      :is-selected-all="isSelectedAll"
      :handle-select-all="handleSelectAll"
      :edit-todo="editTodo" />
    <Footer
      :todos="todos"
      :on-completed-handler="onCompletedHandler"
      :on-remove-todo="onRemoveTodo"
      :is-selected-all="isSelectedAll"
      :handle-clear-complete="handleClearComplete"
      :category="category"
      :set-category="setCategory" />
  </div>
</template>

<style>
@import '@/assets/base.css';

.todoapp {
  width: 500px;
  background: #fff;
  margin: 200px auto;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp h1 {
  position: absolute;
  top: -190px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}
</style>
