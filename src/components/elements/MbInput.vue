<template>
  <div class="mb-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onInput"
      class="mb-input-field"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
});
const emit = defineEmits(['update:modelValue']);

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style lang="scss">
.mb-input {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .mb-input-field {
    width: 100%;
    background: transparent;
    border: none;
    border-bottom: 2px solid $placeholder-color;
    color: $primary-color-light;
    font-size: 30px;
    font-weight: normal;
    padding-bottom: 26px;
    outline: none;
    transition: border-color 0.2s, color 0.2s;
    text-align: center;

    &:focus {
      border-bottom: 2px solid $highlight-color;
    }

    &::placeholder {
      color: $placeholder-color;
    }
  }
}
</style>
