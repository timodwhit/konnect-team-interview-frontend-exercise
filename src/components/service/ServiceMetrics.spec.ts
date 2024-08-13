import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import ServiceMetrics from './ServiceMetrics.vue'
import type { Service } from '@/composables/useServices'
import ServiceMetric from './ServiceMetric.vue'

const metrics: Service['metrics'] = {
  'latency': 0.51,
  'uptime': 0.9145,
  'requests': 855490,
  'errors': 0.075,
}

test('metrics exist and configured', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics,
      configured: true,
    },
  })
  expect(wrapper.findAll('[data-test="metrics"]')).toHaveLength(1)
  expect(wrapper.findAllComponents(ServiceMetric)).toHaveLength(3)
})
test('metrics exist and not configured', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics,
      configured: false,
    },
  })
  expect(wrapper.findAll('[data-test="metrics"]')).toHaveLength(1)
  expect(wrapper.findAllComponents(ServiceMetric)).toHaveLength(1)
})

test('no metrics and configured', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: undefined,
      configured: true,
    },
  })
  expect(wrapper.findAll('[data-test="metrics"]')).toHaveLength(1)
  expect(wrapper.findAllComponents(ServiceMetric)).toHaveLength(0)
})
test('no metrics and not configured', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: undefined,
      configured: false,
    },
  })
  expect(wrapper.findAll('[data-test="metrics"]')).toHaveLength(1)
  expect(wrapper.findAllComponents(ServiceMetric)).toHaveLength(1)
})

test('latency formatting -- error', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, latency: 1.05 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="latency"]').vm.metric
  expect(message).toBe('(Error): Latency greater than 1ms threshold at 1.05ms')
  expect(status).toBe('error')
  expect(stats).toHaveLength(1)
  expect(stats[0].stat).toBe('1.05ms')
  expect(stats[0].label).toBe('latency')
})

test('latency formatting -- warning', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, latency: 0.8 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="latency"]').vm.metric
  expect(message).toBe('(Warning): Latency greater than 0.75ms threshold at 0.80ms')
  expect(status).toBe('warn')
  expect(stats).toHaveLength(1)
  expect(stats[0].stat).toBe('0.80ms')
  expect(stats[0].label).toBe('latency')
})

test('latency formatting -- good', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, latency: 0.05 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="latency"]').vm.metric
  expect(message).toBe('Low latency')
  expect(status).toBe('success')
  expect(stats).toHaveLength(1)
  expect(stats[0].stat).toBe('0.05ms')
  expect(stats[0].label).toBe('latency')
})

test('uptime formatting -- error', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, uptime: 0.7 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="uptime"]').vm.metric
  expect(message).toBe('(Error): Uptime less than 95% threshold at 70.00%')
  expect(status).toBe('error')
  expect(stats).toHaveLength(1)
  expect(stats[0].stat).toBe('70.00%')
  expect(stats[0].label).toBe('uptime')
})

test('uptime formatting -- warning', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, uptime: 0.96 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="uptime"]').vm.metric
  expect(message).toBe('(Warning): Uptime less than 99.9% threshold at 96.00%')
  expect(status).toBe('warn')
  expect(stats).toHaveLength(1)
  expect(stats[0].stat).toBe('96.00%')
  expect(stats[0].label).toBe('uptime')
})

test('uptime formatting -- good', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, uptime: 0.9999 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="uptime"]').vm.metric
  expect(message).toBe('Healthy uptime')
  expect(status).toBe('success')
  expect(stats).toHaveLength(1)
  expect(stats[0].stat).toBe('99.99%')
  expect(stats[0].label).toBe('uptime')
})

test('requests formatting -- error', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, errors: 0.7 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="request"]').vm.metric
  expect(message).toBe('(Error): Error rate greater than 3% with 70.00%')
  expect(status).toBe('error')
  expect(stats).toHaveLength(2)
  expect(stats[1].stat).toBe('70.00%')
  expect(stats[1].label).toBe('errors')
})

test('requests formatting -- warning', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, errors: 0.02 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="request"]').vm.metric
  expect(message).toBe('(Warning): Error rate greater than 1% with 2.00%')
  expect(status).toBe('warn')
  expect(stats).toHaveLength(2)
  expect(stats[1].stat).toBe('2.00%')
  expect(stats[1].label).toBe('errors')
})

test('requests formatting -- good', async () => {
  const wrapper = mount(ServiceMetrics, {
    props: {
      metrics: { ...metrics, errors: 0.001 },
      configured: true,
    },
  })
  const { message, status, stats } = wrapper.findComponent<typeof ServiceMetric>('[data-test="request"]').vm.metric
  expect(message).toBe('Low error rate.')
  expect(status).toBe('success')
  expect(stats).toHaveLength(2)
  expect(stats[1].stat).toBe('0.10%')
  expect(stats[1].label).toBe('errors')
})

// @TODO Write tests around the number formatter and the requests

