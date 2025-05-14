<template>
  <div class="mb-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="type === 'date' ? modelValue || defaultDate : modelValue"
      :min="min"
      :max="max"
      @input="onInput"
      class="mb-input-field"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

defineProps({
  modelValue: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  min: {
    type: String,
    default: '',
  },
  max: {
    type: String,
    default: '',
  },
});

const defaultDate = computed(() => {
  const today = new Date();
  return today.toISOString().split('T')[0];
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
    color: $placeholder-color;
    font-size: 30px;
    font-weight: normal;
    padding-bottom: 26px;
    outline: none;
    transition: border-color 0.2s, color 0.2s;
    text-align: center;

    &[type='number'] {
      -moz-appearance: textfield;
      appearance: textfield;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &:focus {
      border-bottom: 2px solid $highlight-color;
    }

    &::placeholder {
      color: $placeholder-color;
    }
  }
}
</style>
