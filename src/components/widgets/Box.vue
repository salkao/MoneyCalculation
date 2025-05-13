<template>
  <div class="box">
    <h2 class="box-title">{{ title }}</h2>
    <div class="box-content">
      <h3>{{ contentTitle }}</h3>
      <slot name="content"></slot>
    </div>
    <slot name="main"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  contentTitle: string;
}>();
</script>

<style lang="scss">
.box {
  border-radius: 3px;
  background-color: $box-color;
  padding: 20px 30px;

  .box-title {
    margin: 0 auto;
  }
  .box-content {
    background-color: $secondary-color;
    border-radius: 4px;
    box-shadow: 0px 4px 15px 0px #0000000d;
  }
}
</style>
