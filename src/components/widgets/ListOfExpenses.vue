<template>
  <div class="list-of-expenses-container">
    <div class="list-of-expenses-header">
      <span class="list-of-expenses-header-text">Description</span>
    </div>
    <div v-if="noExpenses" class="list-of-expenses-empty">
      <div class="list-of-expenses-title-container">
        <span class="list-of-expenses-title"
          >Looks Like You Haven't<br />
          Added Any</span
        >
        <span class="list-of-expenses-title text-highlight"> Expenses Yet</span>
      </div>
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
  padding: 0 31px;

  .list-of-expenses-header {
    .list-of-expenses-header-text {
      color: $button-primary-color;
      font-size: 15px;
      font-weight: 400px;
      letter-spacing: 0;
    }
  }
  .list-of-expenses-empty {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $primary-color-light;

    .list-of-expenses-title-container {
      .list-of-expenses-title {
        font-size: 42px;
        font-weight: 700;
      }
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

// tablet
@media (min-width: 768px) {
  .list-of-expenses-container {
    padding: 0 80px;
  }
}

// desktop
@media (min-width: 1024px) {
  .list-of-expenses-container {
    flex: 1;
    padding: 0 0 0 32px;
  }
}
</style>
