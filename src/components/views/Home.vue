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
            <CircularProgress
              :value="totalExpensesPercentage"
              :color="progressBarColor"
            />
            <div class="mb-card-container">
              <MbCard
                class="green"
                title="Available"
                :value="availableBalance"
              />
              <MbCard
                title="Spent"
                :value="store.getTotalExpenses"
                :class="{ red: totalExpensesPercentage > 75 }"
              />
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
            <div class="list-of-optional-expenses">
              <OptionalExpenseItem
                v-for="expense in store.getOptionalExpenses"
                :key="expense.id"
                :expense="expense"
              />
            </div>
          </template>
          <template #footer>
            <div class="goals-container">
              <h2 class="box-title goals-title">Goals</h2>
              <!-- this is the percentage that user wants to save this month -->
              <span class="goals-percentage">
                "Save {{ goalPercentage }}% of this amount endered this mounth
                from my salary"
              </span>
            </div>
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
import type { Expense as ExpenseType } from '@/stores/budget';
import Box from '@/components/widgets/Box.vue';
import OptionalExpenseItem from '@/components/widgets/OptionalExpenseItem.vue';
import CircularProgress from '@/components/widgets/CircularProgress.vue';
import MbButton from '@/components/elements/MbButton.vue';
import MbCard from '@/components/widgets/MbCard.vue';
const store = useBudgetStore();

const isModalOpen = computed(() => store.getIsModalOpen);
const expense = computed(() => store.getEditingExpense);
const user = computed(() => store.getUser);
const availableBalance = computed(() => store.getAvailableBalance);

const totalExpensesPercentage = computed(() => {
  return Number(
    ((store.getTotalExpenses / store.getUser.income) * 100).toFixed(0)
  );
});

const progressBarColor = computed(() => {
  switch (true) {
    case Number(totalExpensesPercentage.value) < 50:
      return '#51D289';
    case Number(totalExpensesPercentage.value) < 75:
      return '#FFE600';
    default:
      return '#F44336';
  }
});

function handleSaveExpense(expense: ExpenseType) {
  store.saveExpense({ ...expense, id: expense.id || nanoid() });
  store.setEditingExpenseId(null);
  store.setIsModalOpen(false);
}

// this is the percentage that user wants to save this month
const goalPercentage = computed(() => {
  return (store.getUser.goals / store.getUser.income) * 100;
});
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

      .list-of-optional-expenses {
        display: flex;
        flex-direction: column;
        gap: 23px;
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

    .goals-percentage {
      border-left: 4px solid $highlight-color;
      padding-left: 10px;
      font-size: 11px;
      font-weight: 700;
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
      // fix this with flex
      height: calc(100% - 178px - 87px - 56px);

      .home-content-container-data {
        flex: 1;
        gap: 42px;

        .box {
          display: flex;
          flex-direction: column;

          .box-content {
            display: flex;
            flex-direction: column;
            overflow: hidden;

            .list-of-optional-expenses {
              flex: 1 1 auto;
              overflow: auto;
            }
          }

          .goals-container {
            margin: auto 0;
          }
        }

        .user-income-data {
          font-size: 30px;
        }

        .mb-button-reset {
          font-size: 21px;
        }

        .mb-card-container {
          margin: auto 0;
        }
      }
    }
  }
}
</style>
