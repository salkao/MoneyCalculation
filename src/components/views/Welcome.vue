<template>
  <div class="welcome-container">
    <div class="welcome-box left">
      <h2 class="welcome-title italic">
        Calculate smarter,<br />spend wiser ...
      </h2>
      <img
        src="@/assets/images/Welcome.png"
        alt="Welcome Illustration"
        class="welcome-image"
      />
    </div>
    <div class="welcome-box right">
      <div class="welcome-box-content">
        <div class="welcome-title-container">
          <span class="welcome-title text-lg">Monthly </span>
          <span class="welcome-title text-lg text-highlight">Budget</span>
        </div>
        <div class="welcome-form flex-center">
          <MbInput
            v-model="income"
            class="welcome-input"
            :placeholder="'Insert Your Income'"
            type="number"
          />
          <MbInput
            v-model="name"
            class="welcome-input"
            :placeholder="'Insert Your Name'"
          />
          <MbInput
            v-model="goals"
            class="welcome-input"
            :placeholder="'Insert Your Goals'"
            type="number"
          />
          <button class="welcome-button" @click="startCalculation">
            Start Your Calculation
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MbInput from '@/components/elements/MbInput.vue';
import { useBudgetStore } from '@/stores/budget';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const store = useBudgetStore();
const router = useRouter();

const income = ref('');
const name = ref('');
const goals = ref('');

function startCalculation() {
  store.setUser({
    name: name.value,
    income: Number(income.value),
    goals: Number(goals.value),
  });
  router.push('/home');
}
</script>

<style lang="scss">
.welcome-container {
  display: flex;
  height: 100vh;
  width: 100vw;

  .welcome-box {
    display: flex;
    flex: 1;
    flex-direction: column;
    height: 100vh;
    position: relative;

    &.left {
      background: $secondary-color;
      display: none;

      img {
        margin-top: auto;
      }
    }

    &.right {
      background: $primary-color;
      align-items: center;
      justify-content: center;

      .welcome-box-content {
        flex-direction: column;
        justify-content: space-between;
      }

      .welcome-title-container {
        color: $primary-color-light;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

      .welcome-form {
        flex-direction: column;
        margin-top: 32px;
        width: 100%;
        margin-top: 58px;

        .welcome-input {
          height: 67px;
          margin-bottom: 71px;
        }
        .welcome-button {
          margin-top: 32px;
          background: #ffe45e;
          color: #232323;
          font-size: 1.1rem;
          font-weight: 500;
          border: none;
          border-radius: 4px;
          padding: 14px 0;
          width: 100%;
          cursor: pointer;
          transition: background 0.2s;

          &:hover {
            background: #fff176;
          }
        }
      }
    }

    .welcome-title {
      &.italic {
        margin-top: 30%;
        font-style: italic;
        font-weight: 400;
        font-size: 42px;
      }
    }
  }
}

// desktop
@media (min-width: 1024px) {
  .welcome-container {
    .welcome-box {
      &.left {
        display: flex;
      }
    }
  }
}
</style>
