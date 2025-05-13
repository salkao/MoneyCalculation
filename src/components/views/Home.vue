<template>
  <div class="home-container">
    <Header />
    <div class="home-content-container">
      <div class="home-content-container-data">
        <Box :title="'Calculation'" :content-title="'Income'">
          <template #content>
            <h3 class="user-income-data">£{{ user.income }}</h3>
          </template>
          <template #main>
            <CircularProgress :value="totalExpensesPercentage" />
            <div class="mb-card-container">
              <MbCard
                class="green"
                title="Available"
                :value="availableBalance"
              />
              <MbCard title="Spent" :value="store.getTotalExpenses" />
            </div>
          </template>
          <template #footer>
            <MbButton
              @click="store.resetExpenses"
              class="mb-button-reset"
              label="Reset Expenses"
            />
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
            <h2 class="box-title goals-title">Goals</h2>
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
import MbCard from '@/components/widgets/MbCard.vue';
const store = useBudgetStore();

const isModalOpen = computed(() => store.getIsModalOpen);
const expense = computed(() => store.getEditingExpense);
const user = computed(() => store.getUser);
const availableBalance = computed(
  () => store.getUser.income - store.getTotalExpenses
);

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
// mobile
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
      // padding in the design is 43px left and 38 right it makes sense to use the same padding
      padding: 0 40px;
      display: flex;
      flex-direction: column;
      gap: 37px;

      .user-income-data {
        font-size: 26px;
        color: $primary-color;
        font-weight: 400;
      }

      .mb-card-container {
        border-bottom: $border-dotted;
        padding-bottom: 24px;
        display: flex;
        gap: 8px;
      }

      .mb-button-reset {
        margin-top: 24px;
        font-size: 19px;
      }

      .box-content-data {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 24px;
        width: 100%;
      }

      .box-content {
        margin-bottom: 21px;
      }

      .goals-title {
        border-bottom: none;
        border-top: $border-dotted;
        padding-top: 13px;
      }
    }
  }
}

// tablet
@media (min-width: 768px) {
  .home-container {
    .home-content-container {
      .home-content-container-data {
        flex-direction: row;
        gap: 58px;

        .box {
          flex: 1;
        }
      }
    }
  }
}

// desktop
@media (min-width: 1024px) {
  .home-container {
    overflow: hidden;
    .home-content-container {
      flex-direction: row-reverse;
      flex: 1;
      padding-bottom: 87px;
      padding-top: 56px;

      .home-content-container-data {
        flex: 1;

        .box {
          height: fit-content;
        }

        .user-income-data {
          font-size: 30px;
        }

        .mb-button-reset {
          font-size: 21px;
        }
      }
    }
  }
}
</style>
