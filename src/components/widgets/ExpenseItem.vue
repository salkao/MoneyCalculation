<template>
  <div @click="handleClick" class="expense-item-container">
    <div class="expense-item-container-left">
      <img class="expense-item-icon" :src="iconSrc" :alt="expense.category" />
      <div class="expense-item-container-description">
        <span class="expense-item-text-title">{{ expense.name }}</span>
        <div class="expense-item-date-container">
          Date: <span class="expense-item-date">{{ formattedDate }}</span>
        </div>
      </div>
    </div>
    <span class="expense-item-amount">£{{ expense.amount.toFixed(2) }}</span>
  </div>
  <div v-if="showActions" class="expense-item-actions-container">
    <div class="expense-item-actions-container-content">
      <div @click="handleEdit" class="expense-item-actions-container-left">
        <img src="@/assets/icons/edit.svg" alt="Edit" />
        <span class="expense-item-actions-container-text">Edit</span>
      </div>
      <div @click="handleDelete" class="expense-item-actions-container-right">
        <img src="@/assets/icons/delete.svg" alt="Delete" />
        <span class="expense-item-actions-container-text">Delete</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import { resolveIconPath } from '@/utilities/resolveIconPath';
const props = defineProps<{
  expense: Expense;
}>();

const store = useBudgetStore();
const showActions = ref(false);

const formattedDate = computed(() => {
  const date = new Date(props.expense.date);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day}-${year}`;
});

const iconSrc = computed(() => {
  try {
    return resolveIconPath(props.expense.category);
  } catch {
    // Fallback to a default icon if the category icon doesn't exist
    return resolveIconPath('Various');
  }
});

function handleClick() {
  showActions.value = !showActions.value;
}

function handleEdit() {
  store.setEditingExpenseId(props.expense.id);
}

function handleDelete() {
  store.deleteExpense(props.expense.id);
}
</script>

<style lang="scss">
.expense-item-container {
  display: flex;
  color: $primary-color-light;
  align-items: center;
  border-top: $border-dotted;
  padding: 23px 1px 26px 3px;
  cursor: pointer;

  &:hover {
    background-color: darken($primary-color, 1%);
  }

  .expense-item-container-left {
    display: flex;
    align-items: center;
    justify-content: center;

    .expense-item-icon {
      margin-right: 12px;
      width: 39px;
      height: 39px;
    }

    .expense-item-container-description {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .expense-item-text-title {
        font-size: 21px;
        text-transform: capitalize;
      }

      .expense-item-date-container {
        font-size: 12px;
        .expense-item-date {
          font-weight: 700;
        }
      }
    }
  }

  .expense-item-amount {
    margin-left: auto;
    font-size: 30px;
  }
}

.expense-item-actions-container {
  width: 100%;
  height: 100%;
  padding: 7px 4px;
  border-top: $border-dotted;
  border-bottom: $border-dotted;

  .expense-item-actions-container-content {
    background-color: $secondary-color;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
}
</style>
