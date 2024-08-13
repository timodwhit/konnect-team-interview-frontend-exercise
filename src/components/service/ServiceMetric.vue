<template>
  <a
    v-if="metric"
    class="metric"
    href="#"
    :title="metric.message"
  >
    <div :class="'indicator ' + metric.status" />
    <span
      v-for="(stat, index) in metric.stats"
      :key="index"
    >
      <span v-if="index > 0">&nbsp;·&nbsp;</span>
      <b>{{ stat.stat }}</b> {{ stat.label }}
    </span>
  </a>
</template>

<script setup lang="ts">
type Stat = {
  stat: string;
  label: string;
}
export type Status = 'success' | 'warn' | 'error' | 'disabled'

export type ComputedMetric = {
  status: Status;
  message: string;
  stats: Stat[];
}

defineProps<{ metric: ComputedMetric }>()
</script>

<style lang="scss" scoped>
.indicator {
  --indicator-color: #42D782;
  background: var(--indicator-color);
  border-radius: 50%;
  display: inline-block;
  height: 6px;
  margin-right: 10px;
  width: 6px;

  &.disabled {
    --indicator-color: #B6B6BD;
  }

  &.warn {
    // @TODO: Ask design for the actual color.
    --indicator-color: orange;
  }

  &.error {
    // @TODO: Ask design for the actual color.
    --indicator-color: red;
  }
}

.metric {
  align-items: center;
  color: #707888;
  display: flex;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1;
  padding: .4rem 0;
  text-decoration: none;

  b {
    color: #3C4557;
    padding-right: .5rem
  }
}
</style>