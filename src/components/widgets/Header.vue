<template>
  <div class="header-container">
    <div class="header-logo-container">
      <img src="@/assets/icons/logo.png" alt="logo" class="header-logo" />
      <div class="header-title-container">
        <span class="header-sub-title-text">Expenses</span>
        <div class="header-title text-lg">
          <span>Monthly</span>
          <span class="text-highlight">Budget</span>
        </div>
      </div>
    </div>
    <div class="header-actions-container">
      <MbButton
        label="New Expense"
        class="new-expense-button"
        @click="openModal"
      />
      <span class="header-user-text">Welcome {{ user.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import MbButton from '@/components/elements/MbButton.vue';

const store = useBudgetStore();
const user = computed(() => store.user);

function openModal() {
  store.setIsModalOpen(true);
}
</script>

<style lang="scss">
.header-container,
.header-logo-container,
.header-actions-container {
  display: flex;
  align-items: center;
}

.header-container {
  justify-content: space-between;
  width: 100%;

  .header-title-container {
    display: flex;
    flex-direction: column;
    color: $primary-color-light;

    .header-title {
      font-weight: 800;
      line-height: 50px;
    }

    .header-sub-title-text {
      font-size: 14px;
      color: $button-primary-color;
    }
  }

  .header-actions-container {
    height: 100%;
    margin-left: auto;

    .new-expense-button {
      width: 223px;
      font-weight: 600;
    }

    .header-user-text {
      font-size: 21px;
      font-weight: 600;
      color: $primary-color-light;
    }
  }
}
</style>
