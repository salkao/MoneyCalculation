<template>
  <div class="expense-item-container">
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
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  expense: Expense;
}>();

const formattedDate = computed(() => {
  const date = new Date(props.expense.date);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}, ${day}-${year}`;
});

const iconSrc = computed(() => {
  try {
    return new URL(
      `../../assets/icons/${props.expense.category}.svg`,
      import.meta.url
    ).href;
  } catch {
    // Fallback to a default icon if the category icon doesn't exist
    return new URL('../../assets/icons/Various.svg', import.meta.url).href;
  }
});
</script>

<style lang="scss">
.expense-item-container {
  display: flex;
  color: $primary-color-light;
  align-items: center;
  border-top: 1px dotted $primary-color-light;
  padding: 23px 1px 26px 3px;

  .expense-item-container-left {
    display: flex;
    align-items: center;
    justify-content: center;

    .expense-item-icon {
      margin-right: 17px;
    }

    .expense-item-container-description {
      display: flex;
      justify-content: center;
      flex-direction: column;

      .expense-item-text-title {
        font-size: 21px;
        text-transform: capitalize;
      }

      .expense-item-date {
        font-size: 15px;
        font-weight: 700;
      }
    }
  }

  .expense-item-amount {
    margin-left: auto;
    font-size: 30px;
  }
}
</style>
