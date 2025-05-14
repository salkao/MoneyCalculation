<!-- src/components/DateInput.vue -->
<template>
  <div @click="openPicker" class="date-input">
    <span class="date-input-display">{{
      modelValue ? displayDate : placeholder
    }}</span>
    <input
      ref="dateInput"
      class="date-input-picker"
      type="date"
      :value="internalValue"
      :min="min"
      :max="max"
      @input="onInput"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  min: {
    type: String,
    default: '',
  },
  max: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Date',
  },
});
const emit = defineEmits(['update:modelValue']);
const dateInput = ref<HTMLInputElement | null>(null);

const internalValue = computed(() => props.modelValue);

const displayDate = computed(() => {
  const iso = internalValue.value;
  const [y, m, d] = iso.split('-');
  return `${parseInt(d)}/${parseInt(m)}/${y}`;
});

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}

function openPicker() {
  dateInput.value?.showPicker();
}
</script>

<style lang="scss" scoped>
.date-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  padding-bottom: 26px;

  .date-input-display {
    font-size: 30px;
    display: inline-block;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background: $primary-color-light;
  }

  .date-input-picker {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
}
</style>
