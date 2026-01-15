<template>
  <div class="max-w-sm mx-auto p-6 rounded-2xl shadow-lg bg-gray-800 text-gray-100 space-y-4">
    <h2 class="text-xl font-semibold text-center">Calculator</h2>

    <div
      class="bg-gray-700 px-4 py-3 rounded-lg text-right text-xl font-mono"
      data-testid="display"
    >
      {{ expression || "0" }}
    </div>

    <div class="grid grid-cols-3 gap-2">
      <button
        v-for="(btn, key) in buttons"
        :key="key"
        :class="[
          'py-2 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 cursor-pointer focus:border-amber-600',
          btn.value === '=' ? 'row-span-2 flex items-center justify-center' : '',
        ]"
        :data-testid="btn.value"
        @click="handleButton(btn)"
      >
        {{ btn.label }}
      </button>
    </div>

    <!-- <div data-testid="result" class="text-center text-lg font-bold text-blue-400">
      Result: {{ result }}
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

type ButtonKind = "digit" | "operator" | "action" | "exponent";

interface CalcButton {
  label: string;
  value: string;
  kind: ButtonKind;
}

const buttons: Record<string, CalcButton> = {
  // Digits
  one: { label: "1", value: "1", kind: "digit" },
  two: { label: "2", value: "2", kind: "digit" },
  three: { label: "3", value: "3", kind: "digit" },
  four: { label: "4", value: "4", kind: "digit" },
  five: { label: "5", value: "5", kind: "digit" },
  six: { label: "6", value: "6", kind: "digit" },
  seven: { label: "7", value: "7", kind: "digit" },
  eight: { label: "8", value: "8", kind: "digit" },
  nine: { label: "9", value: "9", kind: "digit" },
  zero: { label: "0", value: "0", kind: "digit" },

  // Operators
  add: { label: "+", value: "+", kind: "operator" },
  sub: { label: "−", value: "-", kind: "operator" },
  mul: { label: "*", value: "*", kind: "operator" },
  div: { label: "/", value: "/", kind: "operator" },
  percent: { label: "%", value: "%", kind: "operator" },
  decimal: { label: ".", value: ".", kind: "operator" },
  // exponents
  square: { label: "x²", value: "", kind: "exponent" },
  cube: { label: "x³", value: "", kind: "exponent" },

  // Grouping
  openParen: { label: "(", value: "(", kind: "operator" },
  closeParen: { label: ")", value: ")", kind: "operator" },

  // Actions
  equals: { label: "=", value: "=", kind: "action" },
  clear: { label: "Clear", value: "clear", kind: "action" },
  backspace: { label: "⌫", value: "backspace", kind: "action" },
};

const handleButton = (btn: CalcButton) => {
  switch (btn.kind) {
    case "digit":
    case "operator":
      append(btn.value);
      break;
    case "exponent":
      if (btn.label === "x²") applyPower(2);
      if (btn.label === "x³") applyPower(3);
      break;
    case "action":
      if (btn.value === "=") evaluateExpression();
      if (btn.value === "clear") clear();
      if (btn.value === "backspace") backspace();
    //   break;
  }
};

const expression = ref<string>("");
const result = ref<number | null>(null);

const append = (value: string) => {
  expression.value += value;
};

const evaluateExpression = () => {
  try {
    if (!expression.value.trim()) {
      result.value = 0;
      return;
    }

    // Handle percent & Parenthesis
    let expr = expression.value
      .replace(/(\d+(\.\d+)?)%/g, (_, num) => `(${num} / 100)`)
      .replace(/(\d)\(/g, "$1*(")
      .replace(/\)(\d)/g, ")*$1");

    // Prevent unsafe characters
    if (!/^[0-9+\-*/().\s]+$/.test(expr)) {
      throw new Error("Invalid expression");
    }

    // Evaluate using Function (safer than eval, still controlled)
    let computed = Function(`"use strict"; return (${expr})`)();

    if (!Number.isFinite(computed)) {
      computed = 0;
    }

    if (typeof computed !== "number" || Number.isNaN(computed)) {
      throw new Error("Invalid result");
    }
    result.value = computed;
    expression.value = String(computed);
  } catch {
    result.value = 0;
    expression.value = "";
  }
};

const applyPower = (type: 2 | 3) => {
  if (!expression.value) return;

  expression.value = Function(`"use strict"; return (${Math.pow(+expression.value, type)})`)();
};

const clear = () => {
  expression.value = "";
};

const backspace = () => {
  expression.value = expression.value.split("").slice(0, -1).join("");
};
</script>
