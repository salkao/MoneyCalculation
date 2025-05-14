<template>
  <div class="expense-form-container">
    <div class="expense-form-container-content">
      <h1>{{ isEditMode ? 'Edit Expense' : 'New Expense' }}</h1>
      <img
        src="@/assets/icons/icon-close.svg"
        alt="close"
        class="close-icon"
        height="40"
        width="40"
        @click="closeModal"
      />
      <form @submit.prevent="handleSubmit" class="expense-form">
        <MbInput
          v-model="form.name"
          :placeholder="'Name'"
          class="expense-input"
        />
        <div class="expense-select-wrapper">
          <MbDropdown
            v-model="form.category"
            :items="categories"
            :placeholder="'Category'"
            :icon="categoryIcon"
            @select="form.category = $event"
          />
        </div>
        <MbDatePicker
          v-model="form.date"
          class="expense-input"
          :min="getCurrentMonthFirstDay"
          :max="getCurrentMonthLastDay"
        />
        <MbInput
          v-model="form.amount"
          :placeholder="'Amount'"
          class="expense-input"
          type="number"
        />
        <MbButton
          :label="isEditMode ? 'Save Expense' : 'Add Expense'"
          class="expense-submit-btn"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Expense } from '@/stores/budget';
import MbInput from '@/components/elements/MbInput.vue';
import MbButton from '@/components/elements/MbButton.vue';
import { useBudgetStore } from '@/stores/budget';
import MbDatePicker from '@/components/elements/MbDatePicker.vue';
import MbDropdown from '@/components/elements/MbDropdown.vue';

const props = defineProps<{
  expense?: Expense | null;
}>();

const store = useBudgetStore();
const emit = defineEmits(['save']);

const categories = computed(() => store.getCategories);
const isEditMode = computed(() => !!props.expense);
const categoryIcon = computed(() =>
  form.value.category ? getCategoryIcon(form.value.category) : undefined
);

const form = ref({
  name: props.expense?.name ?? '',
  category: props.expense?.category ?? '',
  date: props.expense?.date,
  amount: props.expense?.amount?.toString() ?? '',
});

const getCurrentMonthFirstDay = computed(() => {
  const now = new Date();
  const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
  return firstDay.toISOString().split('T')[0];
});

const getCurrentMonthLastDay = computed(() => {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return lastDay.toISOString().split('T')[0];
});

function handleSubmit() {
  if (
    !form.value.name ||
    !form.value.category ||
    !form.value.date ||
    !form.value.amount
  )
    return;
  // check if the expense can be added
  if (Number(form.value.amount) > store.getAvailableBalance) {
    alert(
      'Unable to add this expense: The total expenses would exceed your available income.'
    );
    return;
  }
  emit('save', {
    ...props.expense,
    name: form.value.name,
    category: form.value.category,
    date: form.value.date,
    amount: Number(form.value.amount),
  });
}

function getCategoryIcon(category: string) {
  try {
    return new URL(`../../assets/icons/${category}.svg`, import.meta.url).href;
  } catch {
    return new URL('../../assets/icons/Various.svg', import.meta.url).href;
  }
}

function closeModal() {
  store.setEditingExpenseId(null);
  store.setIsModalOpen(false);
}
</script>

<style lang="scss">
.expense-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: $primary-color-light;
  position: relative;
  background-color: $primary-color;
  width: 100%;
  height: calc(100% - 24px);

  .expense-form-container-content {
    display: flex;
    flex-direction: column;
    align-items: center;

    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
    }

    h1 {
      font-size: 36px;
      margin-bottom: 84px;
      font-weight: normal;
      color: $primary-color-light;
    }
    .expense-form {
      display: flex;
      flex-direction: column;
      width: 400px;
      gap: 32px;

      .expense-select-wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 62px;
        width: 100%;
        padding: 0;
        border-bottom: 2px solid $placeholder-color;

        .filter-dropdown {
          width: 100%;
          border: none;
          font-size: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;

          .dropdown {
            .selected {
              color: $placeholder-color;
            }
          }
        }

        .expense-select {
          background: transparent;
          border: none;
          color: $primary-color-light;
          font-size: 30px;
          outline: none;
          text-align: center;
          appearance: none;
          text-transform: capitalize;
          width: fit-content;
          option {
            color: $primary-color;
          }
        }
      }
    }
    .expense-submit-btn {
      margin-top: 32px;
    }
  }
}

// desktop
@media (min-width: 1024px) {
  .expense-form-container {
    width: fit-content;
    padding: 0 27px;
  }
}
</style>
