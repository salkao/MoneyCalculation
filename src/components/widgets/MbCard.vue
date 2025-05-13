<template>
  <div class="mb-card">
    <div class="mb-card-title">{{ title }}</div>
    <div class="mb-card-value">£{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  value: number;
}>();
</script>

<style lang="scss">
.mb-card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 2px;
  background-color: $primary-color;
  border-radius: 4px;
  flex: 1;
  padding: 9px 0;

  &.green {
    .mb-card-value {
      color: $highlight-color;
    }
  }

  &.red {
    .mb-card-value {
      color: $button-primary-color;
    }
  }

  .mb-card-title {
    font-size: 11px;
    font-weight: 700;
    color: $secondary-color;
    text-transform: uppercase;
  }

  .mb-card-value {
    font-size: 19px;
    color: $button-primary-color;
  }
}
</style>
