<template>
  <button @click="onClick" class="mb-button" :class="{ disabled: disabled }">
    <img v-if="icon" :src="resolveIconPath(icon)" alt="icon" />
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { resolveIconPath } from '@/utilities/resolveIconPath';
defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
    default: '',
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(['click']);

function onClick() {
  emit('click');
}
</script>

<style lang="scss">
@use 'sass:color';

.mb-button {
  background-color: $button-primary-color;
  color: $primary-color;
  font-size: 21px;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 12px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: color.adjust($button-primary-color, $lightness: -5%);
  }

  &.rounded {
    border-radius: 22px;
  }

  &.transparent {
    background-color: transparent;
  }

  &.success {
    color: $highlight-color;
  }

  &.error {
    color: $error-color;
  }

  &.disabled {
    pointer-events: none;
    background-color: $button-disabled-color !important;
  }
}
</style>
