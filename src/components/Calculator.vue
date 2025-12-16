<template>
  <div
    class="max-w-sm mx-auto p-6 rounded-2xl shadow-lg bg-gray-800 text-gray-100 space-y-4"
  >
    <h2 class="text-xl font-semibold text-center">Calculator</h2>

    <div class="flex gap-2">
      <input
        type="number"
        v-model.number="a"
        class="w-1/2 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        type="number"
        v-model.number="b"
        class="w-1/2 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
      />
    </div>

    <div class="grid grid-cols-4 gap-2">
      <button
        v-for="(symbol, key) in ops"
        :key="key"
        @click="op = key"
        class="py-2 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 cursor-pointer focus:border-amber-600"
      >
        {{ symbol }}
      </button>
    </div>

    <div
      data-testid="result"
      class="text-center text-lg font-bold text-blue-400"
    >
      Result: {{ result }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

type Operation = "add" | "sub" | "mul" | "div";

const ops: Record<Operation, string> = {
  add: "+",
  sub: "-",
  mul: "*",
  div: "/",
};

const a = ref<number>(0);
const b = ref<number>(0);
const op = ref<Operation>("add");

const result = computed<number>(() => {
  switch (op.value) {
    case "add":
      return a.value + b.value;
    case "sub":
      return a.value - b.value;
    case "mul":
      return a.value * b.value;
    case "div":
      return b.value === 0 ? 0 : a.value / b.value;
  }
});
</script>
