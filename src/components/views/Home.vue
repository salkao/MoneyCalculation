<template>
  <div class="home-container">
    <Header />
    <div class="home-content-container">
      <ListOfExpenses />
      <div class="home-content-container-right"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/widgets/Header.vue';
import ListOfExpenses from '@/components/widgets/ListOfExpenses.vue';
</script>

<style lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  background-color: $primary-color;
  height: 100vh;
  width: 100vw;

  .home-content-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
