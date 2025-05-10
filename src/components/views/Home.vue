<template>
  <div class="home-container">
    <Header />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/widgets/Header.vue';
</script>

<style lang="scss">
.home-container {
  display: flex;
  background-color: $primary-color;
}
</style>
