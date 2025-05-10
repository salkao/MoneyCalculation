<template>
  <div class="header-container">
    <div class="header-logo-container">
      <img src="@/assets/icons/logo.png" alt="logo" class="header-logo" />
      <div class="header-title-container">
        <span class="header-title-text">Expenses</span>
        <div class="header-title-divider text-lg">
          <span class="header-title-text">Monthly</span>
          <span class="header-title-text text-highlight">Budget</span>
        </div>
      </div>
    </div>
    <div class="header-user">
      <span class="header-user-text">Welcome, {{ user.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBudgetStore } from '@/stores/budget';
import { computed } from 'vue';

const store = useBudgetStore();
const user = computed(() => store.user);
</script>

<style lang="scss">
.header-container {
  display: flex;
  align-items: center;

  .header-logo-container {
    display: flex;
    align-items: center;
  }

  .header-title-container {
    display: flex;
    flex-direction: column;
    color: $primary-color-light;
  }
}
</style>
