<template>
  <div class="filter-dropdown">
    <span v-if="label" class="filter-label">{{ label }}</span>
    <div class="dropdown" @click="toggleDropdown">
      <span class="selected">{{ selected }}</span>
      <span v-if="showArrow" class="arrow">▼</span>
    </div>
    <ul v-if="isOpen" class="dropdown-menu">
      <li
        v-for="item in items"
        :key="item"
        :class="{ active: item === selected }"
        @click.stop="select(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'select', item: string): void;
}>();

const props = defineProps<{
  items: string[];
  label?: string;
  showArrow?: boolean;
  modelValue?: string;
  placeholder?: string;
}>();

const selected = ref(props.modelValue || props.placeholder || 'All');
const isOpen = ref(false);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function select(item: string) {
  if (item === props.placeholder) return;
  selected.value = item;
  isOpen.value = false;
  emit('select', item);
}
</script>

<style lang="scss">
@use 'sass:color';
.filter-dropdown {
  display: inline-flex;
  align-items: center;
  position: relative;
  border: 1px solid $button-primary-color;
  border-radius: 4px;
  padding: 8px 12px;
  background-color: $primary-color;
  user-select: none;

  .filter-label {
    color: $primary-color-light;
    font-weight: 700;
    margin-right: 8px;
    border-right: 1px solid $button-primary-color;
    padding-right: 8px;
  }

  .dropdown {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    .selected {
      color: $button-primary-color;
      font-weight: 500;
      margin-right: 4px;
      text-transform: capitalize;
    }

    .arrow {
      color: $button-primary-color;
      font-size: 0.7em;
      line-height: 1;
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    background-color: color.adjust($primary-color, $lightness: -1%);
    border: 1px solid $button-primary-color;
    border-radius: 4px;
    margin: 0;
    padding: 4px 0;
    list-style: none;
    min-width: 100%;
    z-index: 10;

    li {
      padding: 6px 12px;
      color: #fff;
      cursor: pointer;
      white-space: nowrap;
      text-transform: capitalize;

      &:hover {
        background: rgba(255, 235, 59, 0.2);
      }

      &.active {
        background: rgba(255, 235, 59, 0.1);
      }
    }
  }
}
</style>
