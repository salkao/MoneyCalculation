<template>
  <button @click="onClick" class="mb-button">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['click']);

function onClick() {
  emit('click');
}
</script>

<style lang="scss">
.mb-button {
  background-color: $button-primary-color;
  color: $primary-color;
  font-size: 21px;
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 12px 0;
  cursor: pointer;
}
</style>
