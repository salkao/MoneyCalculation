<template>
  <div class="optional-expense-item">
    <div class="optional-expense-icon-container">
      <img :src="resolveIconPath(expense.id)" alt="expense" />
    </div>
    <h3>{{ expense.name }}</h3>
    <MbButton label="select" class="optional-expense-item-button rounded" />
  </div>
</template>

<script setup lang="ts">
import { Expense } from '@/stores/budget';
import { resolveIconPath } from '@/utilities/resolveIconPath';
import MbButton from '@/components/elements/MbButton.vue';

defineProps<{
  expense: Expense;
}>();
</script>

<style lang="scss">
.optional-expense-item {
  display: flex;
  align-items: center;

  .optional-expense-icon-container {
    display: flex;
    border-radius: 50%;
    width: 41px;
    height: 41px;
    overflow: hidden;
    flex-shrink: 0;
    border: 3px solid $highlight-color;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .optional-expense-item-button {
    flex-grow: 0;
    width: auto;
    padding: 0 12px;
    background-color: $highlight-color;
    margin-left: auto;
  }
}
</style>
