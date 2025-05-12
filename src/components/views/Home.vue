<template>
  <div class="home-container">
    <Header />
    <div class="home-content-container">
      <ListOfExpenses />
      <div class="home-content-container-right"></div>
    </div>
  </div>
  <div v-if="isModalOpen" class="modal">
    <Expense @save="handleSaveExpense" :expense="expense" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { nanoid } from 'nanoid';
import Header from '@/components/widgets/Header.vue';
import ListOfExpenses from '@/components/widgets/ListOfExpenses.vue';
import Expense from '@/components/views/Expense.vue';
import { useBudgetStore } from '@/stores/budget';

const store = useBudgetStore();

const isModalOpen = computed(() => store.getIsModalOpen);
const expense = computed(() => store.getEditingExpense);

function handleSaveExpense(expense: Expense) {
  store.saveExpense({ id: expense.id || nanoid(), ...expense });
  store.setEditingExpenseId(null);
  store.setIsModalOpen(false);
}
</script>

<style lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  background-color: $primary-color;
  height: 100vh;
  width: 100vw;

  .home-content-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
