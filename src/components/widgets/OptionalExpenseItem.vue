<template>
  <div class="optional-expense-item">
    <div class="optional-expense-icon-container">
      <img :src="resolveIconPath(expense.id)" alt="expense" />
    </div>
    <h3 class="optional-expense-item-name">{{ expense.name }}</h3>
    <MbButton
      @click="handleSaveExpense"
      label="select"
      class="optional-expense-item-button rounded"
    />
  </div>
</template>

<script setup lang="ts">
import type { Expense as ExpenseType } from '@/stores/budget';
import { resolveIconPath } from '@/utilities/resolveIconPath';
import MbButton from '@/components/elements/MbButton.vue';
import { useBudgetStore } from '@/stores/budget';
import { nanoid } from 'nanoid';
const props = defineProps<{
  expense: ExpenseType;
}>();

const store = useBudgetStore();

const handleSaveExpense = () => {
  store.saveExpense({
    ...props.expense,
    /*
      use can add multiple optional expenses
      so we need to add a unique id to override the defult one.
    */
    id: nanoid(),
    date: new Date().toISOString(),
  });
};
</script>

<style lang="scss">
.optional-expense-item {
  display: flex;
  align-items: center;
  width: 100%;

  .optional-expense-item-name {
    font-size: 11px;
    font-weight: normal;
    text-transform: uppercase;
    margin-left: 11px;
  }

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
    padding: 2px 12px;
    background-color: $highlight-color;
    margin-left: auto;
    font-size: 12px;
    font-weight: 700;
  }
}
</style>
