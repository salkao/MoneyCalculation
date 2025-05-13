<template>
  <div class="circular-progress">
    <div class="circle">
      <svg viewBox="0 0 100 100" class="circle__svg">
        <!-- Background track -->
        <circle
          cx="50"
          cy="50"
          r="43"
          :style="{
            'stroke-width': 5,
            stroke: bgColor,
            'stroke-opacity': backgroundOpacity,
          }"
          class="circle__progress circle__progress"
        />
        <!-- Animated fill -->
        <circle
          cx="50"
          cy="50"
          r="43"
          :style="fillStyle"
          class="circle__progress circle__progress"
        />
      </svg>

      <div class="percent">
        <slot>
          <span class="percent__int">{{ value }}</span>
          <span class="percent_sign">%</span>
        </slot>
        <div class="percent__label">spent</div>
      </div>
    </div>
    <slot name="footer" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onBeforeUnmount } from 'vue';

const props = defineProps({
  value: {
    type: [Number, String],
    default: 0,
    validator: (v) => !isNaN(+v) && +v <= 100,
  },
  transitionDuration: { type: Number, default: 1000 },
  backgroundOpacity: { type: Number, default: 1 },
  resetOnNewValue: { type: Boolean, default: false },
  color: { type: String, default: '#51D289' },
  bgColor: { type: String, default: '#C4C4C4' },
});

// fixed radius + circumference in viewBox units:
const R = 43;
const C = 2 * Math.PI * R;

// reactive dash-offset
const offset = ref(C);

// fill-circle style
const fillStyle = computed(() => ({
  'stroke-dashoffset': offset.value,
  'stroke-dasharray': C,
  transition: `stroke-dashoffset ${props.transitionDuration}ms ease`,
  'stroke-width': 5,
  stroke: props.color,
}));

function updateArc(v) {
  const n = +v;
  if (props.resetOnNewValue) offset.value = C;
  // next frame so transition applies
  requestAnimationFrame(() => {
    offset.value = (C * (100 - n)) / 100;
  });
}

watch(
  () => props.value,
  (v) => updateArc(v),
  { immediate: true }
);
</script>

<style lang="scss">
.circular-progress {
  display: inline-block;
  width: 100%;

  .circle {
    position: relative;
    width: 100%;
    aspect-ratio: 1;

    &__svg {
      width: 100%;
      height: 100%;
      transform: rotate(-90deg);
      display: block;
    }

    &__progress {
      fill: none;
      stroke-dasharray: var(--initialStroke);
      transition: stroke-dashoffset var(--transitionDuration) ease;
      stroke-width: 14px;
    }
  }

  .percent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    &__int {
      font-size: 2rem;
      font-weight: bold;
      line-height: 1;
    }

    .percent_sign {
      font-size: 2rem;
      line-height: 1;
    }

    &__label {
      margin-top: 0.25em;
      font-size: 1rem;
      color: #666;
    }
  }
}
</style>
