import { mount, shallowMount } from '@vue/test-utils'
import ServiceCard from './ServiceCard.vue'
import { expect, test } from 'vitest'
import type { Service } from '@/composables/useServices'

const service: Service = {
  'id': 'c43a5117-4c15-4cbf-8f40-869a6cb995fd',
  'name': 'Tasty Soft Chair',
  'description': 'The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive',
  'type': 'REST',
  'published': false,
  'configured': true,
  'versions': [
    {
      'id': '1c1630ce-e572-4825-b73e-6839f0d889db',
      'name': '4.3.9',
      'description': 'Compatible intermediate flexibility',
      'updated_at': '2024-03-14T01:00:44.298Z',
    },
    {
      'id': '5cdfacd9-1cc0-4607-8b21-a6ecaa7a242b',
      'name': '1.0.9',
      'description': 'New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart',
      'updated_at': '2024-05-05T11:54:37.731Z',
    },
  ],
  'metrics': {
    'latency': 0.51,
    'uptime': 0.9145,
    'requests': 855490,
    'errors': 0.075,
  },
}
test('shows title and description', async () => {
  const wrapper = shallowMount(ServiceCard, {
    props: {
      service,
    },
    stubs: ['router-link'],
  })
  const name = wrapper.get('[data-test="name"]')
  expect(name.text()).toBe(service.name)
  const description = wrapper.get('[data-test="description"]')
  expect(description.text()).toBe(service.description)
})
test('unpublished and configured', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, published: false, configured: true },

    },
  })
  const name = wrapper.get('[data-test="published-state"]')
  expect(name.text()).toBe('Unpublished')
})

test('published and configured', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, published: true, configured: true },
    },
  })
  const name = wrapper.get('[data-test="published-state"]')
  expect(name.text()).toBe('Published to portal')
})
test('unpublished and not configured', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, published: false, configured: false },
    },
  })
  const name = wrapper.get('[data-test="published-state"]')
  expect(name.text()).toBe('In progress')
})
test('published and not configured', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, published: true, configured: false },
    },
  })
  const name = wrapper.get('[data-test="published-state"]')
  expect(name.text()).toBe('In progress')
})
test('default versions', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service,
    },
  })
  const name = wrapper.get('[data-test="versions"]')
  expect(name.text()).toBe('2 versions')
})
test('no versions on service', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, versions: undefined },
    },
  })
  expect(wrapper.findAll('[data-test="versions"]')).toHaveLength(0)
})
test('1 versions', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, versions: [...service.versions].slice(0,1) },
    },
  })
  const name = wrapper.get('[data-test="versions"]')
  expect(name.text()).toBe('1 version')
})
test('empty versions array', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, versions: [] },
    },
  })
  expect(wrapper.findAll('[data-test="versions"]')).toHaveLength(0)
})

test('no metrics', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service, metrics: undefined },
    },
  })
  expect(wrapper.findAll('[data-test="metrics"]')).toHaveLength(1)
})
test('metrics exist', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service },
    },
  })
  expect(wrapper.findAll('[data-test="metrics"]')).toHaveLength(1)
})
test('developers exist', async () => {
  const wrapper = mount(ServiceCard, {
    props: {
      service: { ...service },
    },
  })
  expect(wrapper.findAll('[data-test="developers"]')).toHaveLength(1)
})
