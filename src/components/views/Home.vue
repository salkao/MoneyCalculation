<template>
  <div class="home-container">
    <Header />
    <div class="home-content-container">
      <div class="home-content-container-data">
        <Box :title="'Calculation'" :content-title="'Income'">
          <template #content>
            <div class="box-content-data">
              <h3>{{ user.income }}</h3>
            </div>
          </template>
          <template #main>
            <CircularProgress :value="totalExpensesPercentage" />
          </template>
          <template #footer>
            <MbButton @click="store.resetExpenses" label="Reset Expenses" />
          </template>
        </Box>
        <Box :title="'Optionals'" :content-title="'choose any fix expenses'">
          <template #content>
            <div class="box-content-data">
              <OptionalExpenseItem
                v-for="expense in store.getOptionalExpenses"
                :key="expense.id"
                :expense="expense"
              />
            </div>
          </template>
          <template #footer>
            <h2>Goals</h2>
          </template>
        </Box>
      </div>
      <ListOfExpenses />
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
import Box from '@/components/widgets/Box.vue';
import OptionalExpenseItem from '@/components/widgets/OptionalExpenseItem.vue';
import CircularProgress from '@/components/widgets/CircularProgress.vue';
import MbButton from '@/components/elements/MbButton.vue';

const store = useBudgetStore();

const isModalOpen = computed(() => store.getIsModalOpen);
const expense = computed(() => store.getEditingExpense);
const user = computed(() => store.getUser);

const totalExpensesPercentage = computed(() => {
  return ((store.getTotalExpenses / store.getUser.income) * 100).toFixed(0);
});

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
  overflow-y: auto;

  .home-content-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .home-content-container-data {
      // padding in the desing is 43px left and 38 right it makes sense to use the same padding
      padding: 0 40px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }
}
</style>
