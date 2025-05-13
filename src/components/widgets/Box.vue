<template>
  <div class="box">
    <h2 class="box-title">{{ title }}</h2>
    <div class="box-content">
      <h3 class="box-content-title">{{ contentTitle }}</h3>
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
// mobile
.box {
  border-radius: 3px;
  background-color: $box-color;
  padding: 20px 30px;

  .box-title {
    border-bottom: $border-dotted;
    padding-bottom: 13px;
  }
  .box-content {
    background-color: $secondary-color;
    border-radius: 4px;
    box-shadow: 0px 4px 15px 0px #0000000d;
    margin-top: 22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 14px;

    .box-content-title {
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 700;
    }
  }
}

// desktop
@media (min-width: 1024px) {
  .box {
    .box-title {
      font-size: 30px;
    }
    .box-content {
      .box-content-title {
        font-size: 13px;
      }
    }
  }
}
</style>
