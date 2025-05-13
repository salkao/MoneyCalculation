<template>
  <div class="header-container">
    <div class="header-content">
      <div class="header-logo-container">
        <img src="@/assets/icons/logo.png" alt="logo" class="header-logo" />
        <div class="header-title-container">
          <span class="header-sub-title-text">Expenses</span>
          <div class="header-title">
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
  align-items: flex-start;
  flex-direction: column;
  padding: 29px 32px 24px 32px;

  .header-content {
    border-bottom: 1px solid $secondary-color;
    width: 100%;
    padding-bottom: 24px;

    .header-logo-container {
      .header-logo {
        width: 33px;
        height: 36px;
      }
    }

    .header-title-container {
      display: flex;
      flex-direction: column;
      color: $primary-color-light;

      .header-title {
        font-weight: normal;
        line-height: 31px;
      }

      .header-sub-title-text {
        font-size: 11px;
        color: $button-primary-color;
      }
    }

    .header-actions-container {
      margin-top: 14px;

      .new-expense-button {
        width: 223px;
        font-weight: 600;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }

      .header-user-text {
        font-size: 20px;
        font-weight: normal;
        color: $primary-color-light;
      }
    }
  }
}
</style>
