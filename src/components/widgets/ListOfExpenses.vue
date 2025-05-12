<template>
  <div class="list-of-expenses-container">
    <div class="list-of-expenses-header">
      <span class="list-of-expenses-header-text">Description</span>
    </div>
    <div v-if="noExpenses" class="list-of-expenses-empty">
      <span class="list-of-expenses-title"
        >Looks Like You Haven't Added Any</span
      >
      <span class="list-of-expenses-title text-highlight">Expenses Yet</span>
      <span class="list-of-expenses-subtitle"
        >No worries, just hit the
        <span class="text-highlight">'Add'</span> button to get started</span
      >
      <img
        src="@/assets/icons/cart.svg"
        alt="Cart Icon"
        class="list-of-expenses-empty-image"
      />
    </div>
    <div v-else class="list-of-expenses-list">
      <ExpenseItem
        v-for="expense in expenses"
        :key="expense.id"
        :expense="expense"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import ExpenseItem from '@/components/widgets/ExpenseItem.vue';

const store = useBudgetStore();

const expenses = computed(() => store.getExpenses);
const noExpenses = computed(() => expenses.value.length === 0);
</script>

<style lang="scss">
.list-of-expenses-container {
  display: flex;
  flex-direction: column;

  .list-of-expenses-header {
    .list-of-expenses-header-text {
      color: $button-primary-color;
      font-size: 21px;
      font-weight: 400px;
    }
  }
  .list-of-expenses-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $primary-color-light;

    .list-of-expenses-title {
      font-size: 42px;
      font-weight: 700;
    }

    .list-of-expenses-subtitle {
      font-size: 21px;
      font-weight: 600;
      margin-top: 49px;
    }

    .list-of-expenses-empty-image {
      margin-top: 35px;
    }
  }
}
</style>
