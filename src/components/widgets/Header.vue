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
          :icon="'plus'"
          :disabled="availableBalance <= 0"
          label="New Expense"
          class="new-expense-button"
          @click="openModal"
        />
        <MbButton
          class="user-button transparent"
          :label="buttonLabel"
          :icon="'user'"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useBudgetStore } from '@/stores/budget';
import MbButton from '@/components/elements/MbButton.vue';

const store = useBudgetStore();

const user = computed(() => store.getUser);
const userName = computed(() => user.value.name);
const buttonLabel = computed(() => `Welcome ${userName.value}`);
const availableBalance = computed(() => store.getAvailableBalance);

function openModal() {
  store.setIsModalOpen(true);
}
</script>

<style lang="scss">
// mobile
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
        font-size: 30px;
      }

      .header-sub-title-text {
        font-size: 11px;
        color: $button-primary-color;
      }
    }

    .header-actions-container {
      margin-top: 14px;

      .new-expense-button {
        z-index: 20;
        font-weight: 600;
        position: absolute;
        bottom: 30px;
        right: 30px;
        width: 48px;
        height: 48px;
        border-radius: 50%;

        img {
          display: block;
        }

        span {
          display: none;
        }
      }

      .user-button {
        font-size: 20px;
        padding: 0;
        width: fit-content;
        font-weight: normal;
        color: $primary-color-light;

        img {
          display: none;
        }
      }
    }
  }
}

// tablet
@media (min-width: 768px) {
  .header-container {
    .header-content {
      position: relative;
      .header-logo-container {
        align-items: flex-start;
        .header-logo {
          height: 48px;
          width: 43px;
        }
        .header-title-container {
          .header-sub-title-text {
            font-size: 14px;
          }
          .header-title {
            font-size: 40px;
          }
        }
      }

      .header-actions-container {
        margin-top: 19px;

        .new-expense-button {
          width: 175px;
          height: 42px;
          border-radius: 3px;
          font-weight: normal;
          position: absolute;
          padding: 10px 0;
          top: 0;
        }
      }
    }
  }
}

// desktop
@media (min-width: 1024px) {
  .header-container {
    padding: 33px 40px 24px 24px;
    .header-content {
      display: flex;
      justify-content: space-between;
      .header-logo-container {
        align-items: center;
        .header-logo {
          height: 96px;
          width: 96px;
        }

        .header-title-container {
          .header-sub-title-text {
            font-size: 21px;
            font-weight: 600;
          }
          .header-title {
            font-size: 60px;
            line-height: 100%;
            font-weight: 800;
          }
        }
      }
      .header-actions-container {
        display: flex;
        align-items: center;
        gap: 23px;

        .new-expense-button {
          font-weight: 600;
          position: static;
          width: 223px;
          height: 48px;

          img {
            display: none;
          }
          span {
            display: block;
          }
        }

        .user-button {
          width: 248px;
          font-weight: 600;
          color: $primary-color-light;

          img {
            display: block;
            margin-right: 6px;
          }
        }
      }
    }
  }
}
</style>
