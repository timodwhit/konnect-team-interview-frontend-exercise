<template>
  <div
    class="metrics"
    data-test="metrics"
  >
    <ServiceMetric
      v-if="latency"
      data-test="latency"
      :metric="latency"
    />
    <ServiceMetric
      v-if="uptime"
      data-test="uptime"
      :metric="uptime"
    />
    <ServiceMetric
      v-if="request"
      data-test="request"
      :metric="request"
    />
    <ServiceMetric
      v-if="notConfigured"
      data-test="not-configured"
      :metric="notConfigured"
    />
  </div>
</template>


<script setup lang="ts">
import ServiceMetric from '@/components/service/ServiceMetric.vue'
import { computed, type ComputedRef } from 'vue'
import type { ComputedMetric, Status } from '@/components/service/ServiceMetric.vue'
import type { Service } from '@/composables/useServices'
const props = defineProps<{ configured: boolean, metrics?: Service['metrics'] }>()

const latency: ComputedRef<ComputedMetric | undefined> = computed(()=>{
  if (!props.metrics) {
    return
  }
  if (!props.configured) {
    return
  }
  const { latency } = props.metrics
  // We don't have examples of latency being returned with more than two digits, but let's trim just in case.
  // @TODO: If this number get's really big, ms is not the right ending here. Let's cross that bridge when it occurs (Let's hope it never does).
  const stat = Number(latency).toFixed(2) + 'ms'
  let status: Status = 'success'
  let message = 'Low latency'
  // @TODO: Validate with PM on what these values should be.
  if (latency > 1) {
    status = 'error'
    message = `(Error): Latency greater than 1ms threshold at ${stat}`
  } else if (latency > 0.75) {
    status = 'warn'
    message = `(Warning): Latency greater than 0.75ms threshold at ${stat}`
  }
  return {
    status,
    message,
    stats: [
      {

        stat,
        label: 'latency',
      },
    ],
  }
})
const uptime: ComputedRef<ComputedMetric | undefined> = computed(() => {
  if (!props.metrics) {
    return
  }
  if (!props.configured) {
    return
  }
  const { uptime } = props.metrics
  const stat = Number(uptime * 100).toFixed(2) + '%'
  let status: Status = 'success'
  let message = 'Healthy uptime'
  // @TODO: Validate with PM on what these values should be.
  if (uptime < .95) {
    status = 'error'
    message = '(Error): Uptime less than 95% threshold at ' + stat
  } else if (0.95 < uptime && uptime < 0.999) {
    status = 'warn'
    message = '(Warning): Uptime less than 99.9% threshold at ' + stat
  }

  return {
    status,
    message,
    stats: [
      {

        stat,
        label: 'uptime',
      },
    ],
  }
})
const request: ComputedRef<ComputedMetric | undefined> = computed(() => {
  if (!props.metrics) {
    return
  }
  if (!props.configured) {
    return
  }
  const { requests, errors } = props.metrics
  // Format the percentage to use in message and as stat.
  const percentage = Number(errors * 100).toFixed(2) + '%'
  // Set up the intl formatter for the number to keep it standard across all langs.
  const formatter = Intl.NumberFormat('en', { notation: 'compact' })
  const requestStat = formatter.format(requests)
  // Set the initial status to success because we're a hopeful bunch of engineers.
  let status: Status = 'success'
  // Add a message for the hover state.
  let message = 'Low error rate.'
  // @TODO: Validate with PM on what these values should be.
  if (errors > .03) {
    status = 'error'
    message = '(Error): Error rate greater than 3% with ' + percentage
  } else if (errors > .01) {
    status = 'warn'
    message = '(Warning): Error rate greater than 1% with ' + percentage
  }
  return {
    status,
    message,
    stats: [
      {
        stat: requestStat,
        label: 'requests',
      },
      {
        stat: percentage,
        label: 'errors',
      },
    ],
  }
})
const notConfigured: ComputedRef<ComputedMetric | undefined> = computed(() => {
  if (props.configured) {
    return
  }
  return {
    status: 'disabled',
    message: 'Not configured with runtime yet',
    stats: [
      { stat: '', label:  'Not configured with runtime yet' },
    ],
  }
})
</script>

<style scoped lang="scss">
.metrics {
  color: #707888;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;

  b {
    color: #3C4557;
  }
}
</style>
