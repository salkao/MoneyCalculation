<template>
  <div class="expense-form-container">
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
        <img
          v-if="form.category"
          :src="getCategoryIcon(form.category)"
          :alt="form.category"
        />
        <select v-model="form.category" class="expense-select">
          <option disabled value="">Category</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
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
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Expense } from '@/stores/budget';
import MbInput from '@/components/elements/MbInput.vue';
import MbButton from '@/components/elements/MbButton.vue';
import { useBudgetStore } from '@/stores/budget';
import MbDatePicker from '@/components/elements/MbDatePicker.vue';
const props = defineProps<{
  expense?: Expense | null;
}>();

const store = useBudgetStore();
const emit = defineEmits(['save']);

const categories = computed(() => store.getCategories);
const isEditMode = computed(() => !!props.expense);

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
  store.setIsModalOpen(false);
}
</script>

<style lang="scss">
.expense-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: $primary-color-light;
  position: relative;
  background-color: $primary-color;
  padding: 106px 27px;
  width: 100%;

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
      border-bottom: 2px solid $placeholder-color;

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
</style>
