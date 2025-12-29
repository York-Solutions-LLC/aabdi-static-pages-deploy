<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import CalculatorComponent from "./components/CalculatorComponent.vue";
</script>

<template>
  <div class="min-h-screen w-screen bg-gray-900 text-gray-100">
    <div class="flex justify-center w-screen mx-auto">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <div class="py-10">
      <HelloWorld msg="Hello, Abdulkader" />
      <CalculatorComponent />
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
