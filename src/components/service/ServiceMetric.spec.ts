import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import ServiceMetric, { type ComputedMetric } from './ServiceMetric.vue'

describe('ServiceMetric tests', () => {
  test('title is populated with message', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1 Message',
      status: 'error',
      stats: [],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    expect(wrapper.findTestId('metric').attributes().title).toBe('Computed Metric #1 Message')
  })

  test('indicator: error status is passed', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1',
      status: 'error',
      stats: [],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    const indicator = wrapper.findTestId('metric-indicator')
    expect(indicator.classes().includes('error')).toBe(true)
    expect(indicator.classes().includes('indicator')).toBe(true)
  })
  test('indicator: success status is passed', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1',
      status: 'success',
      stats: [],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    const indicator = wrapper.findTestId('metric-indicator')
    expect(indicator.classes().includes('success')).toBe(true)
    expect(indicator.classes().includes('indicator')).toBe(true)
  })
  test('indicator: error status is passed', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1',
      status: 'warn',
      stats: [],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    const indicator = wrapper.findTestId('metric-indicator')
    expect(indicator.classes().includes('warn')).toBe(true)
    expect(indicator.classes().includes('indicator')).toBe(true)
  })
  test('text: no stats', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1',
      status: 'warn',
      stats: [],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    expect(wrapper.findTestId('metric-stats').exists()).toBe(false)
  })
  test('text: 1 stat', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1',
      status: 'warn',
      stats: [
        {
          stat: '12%',
          label: 'IPA',
        },
      ],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    expect(wrapper.findTestId('metric-stats').text()).toBe('12% IPA')
  })
  test('text: multiple stats', async () => {
    const metric: ComputedMetric = {
      message: 'Computed Metric #1',
      status: 'warn',
      stats: [
        {
          stat: '12%',
          label: 'better',
        },
        {
          stat: '34%',
          label: 'best',
        },
        {
          stat: '55%',
          label: 'bestest',
        },
      ],
    }

    const wrapper = mount(ServiceMetric, {
      props: {
        metric,
      },
    })
    const allStats = wrapper.findAll('[data-testid="metric-stats"]')
    expect(allStats).toHaveLength(3)
  })
})