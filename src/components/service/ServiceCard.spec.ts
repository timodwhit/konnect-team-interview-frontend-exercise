import ServiceCard from './ServiceCard.vue'
import { expect, test } from 'vitest'
import type { Service } from '@/composables/useServices'
import { describe } from 'node:test'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'

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

describe('ServiceCard tests', () => {
  const stubs = {
    RouterLink: RouterLinkStub,
  }
  test('title and description show', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service,
      },
      stubs,
    })
    expect(wrapper.findTestId('name').isVisible()).toBe(true)
    const description = wrapper.findTestId('description')
    expect(description.text()).toBe(service.description)
  })
  test('status when not published and configured', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, published: false, configured: true },
      },
      stubs,
    })
    const name = wrapper.findTestId('published-state')
    expect(name.text()).toBe('Unpublished')
  })

  test('status when not published and not configured', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, published: false, configured: false },
      },
      stubs,
    })
    const name = wrapper.findTestId('published-state')
    expect(name.text()).toBe('In progress')
  })
  test('status when published and configured', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, published: true, configured: true },
      },
      stubs,
    })
    const name = wrapper.findTestId('published-state')
    expect(name.text()).toBe('Published to portal')
  })
  test('status when published and not configured', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, published: true, configured: false },
      },
      stubs,
    })
    const name = wrapper.findTestId('published-state')
    expect(name.text()).toBe('In progress')
  })
  test('versions show correct count', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service,
      },
      stubs,
    })
    const name = wrapper.findTestId('versions')
    expect(name.text()).toBe('2 versions')
  })
  test('versions when no versions', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, versions: undefined },
      },
      stubs,
    })
    expect(wrapper.findTestId('versions').exists()).toBeFalsy()
  })
  test('versions with 1 version show singular text', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, versions: [...service.versions].slice(0,1) },
      },
      stubs,
    })
    const name = wrapper.findTestId('versions')
    expect(name.text()).toBe('1 version')
  })
  test('versions with empty versions array', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, versions: [] },
      },
      stubs,
    })
    expect(wrapper.findTestId('versions').exists()).toBeFalsy()
  })

  test('metrics with no metrics', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, metrics: undefined },
      },
      stubs,
    })
    expect(wrapper.findTestId('metrics').exists()).toBeTruthy()
  })
  test('metrics exist', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service },
      },
      stubs,
    })
    expect(wrapper.findTestId('metrics').exists()).toBeTruthy()
  })
  test('developers exist', async () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service },
      },
      stubs,
    })
    expect(wrapper.findTestId('developers').exists()).toBeTruthy()
  })
  test('developers: none in versions', () => {
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service },
      },
      stubs,
    })
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.length).toBe(0)
  })
  test('developers: ordered by versions', () => {
    const versions = [{
      'id': '98c5211a-5ad0-4ee0-81dd-ac65ec2f47e7',
      'name': '2.7.1',
      'description': 'Realigned client-driven throughput',
      'developer': {
        'id': '1',
        'name': 'Edgar Hessel',
        'email': 'Edgar.Hessel19@hotmail.com',
        'avatar': 'https://avatars.githubusercontent.com/u/50583621',
      },
      'updated_at': '2024-03-26T04:54:30.043Z',
    },
    {
      'id': 'f415d0d0-80bc-4812-91c2-cd558abb6861',
      'name': '4.6.7',
      'description': 'Carbonite web goalkeeper gloves are ergonomically designed to give easy fit',
      'developer': {
        'id': '2',
        'name': 'Jon Treutel',
        'email': 'Jon.Treutel63@hotmail.com',
        'avatar': 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/76.jpg',
      },
      'updated_at': '2024-03-22T05:00:31.213Z',
    },
    {
      'id': '7d3067fc-d8b6-4716-97be-155807642b1c',
      'name': '8.0.6',
      'description': 'Advanced mobile hardware',
      'developer': {
        'id': '3',
        'name': 'Cary Wilderman',
        'email': 'Cary_Wilderman@gmail.com',
        'avatar': 'https://avatars.githubusercontent.com/u/22076275',
      },
      'updated_at': '2024-03-05T03:38:59.448Z',
    },
    {
      'id': '9e5e5d21-d1e5-43b8-942f-9446de7b9893',
      'name': '8.2.9',
      'description': 'Innovative value-added moratorium',
      'developer': {
        'id': '1',
        'name': 'Edgar Hessel',
        'email': 'Edgar.Hessel19@hotmail.com',
        'avatar': 'https://avatars.githubusercontent.com/u/50583621',
      },
      'updated_at': '2024-07-27T13:22:20.979Z',
    },
    {
      'id': '6c77f4e6-24b9-4dc2-b0b7-5ecaf9764315',
      'name': '0.6.4',
      'description': 'Secured upward-trending alliance',
      'developer': {
        'id': '3',
        'name': 'Cary Wilderman',
        'email': 'Cary_Wilderman@gmail.com',
        'avatar': 'https://avatars.githubusercontent.com/u/22076275',
      },
      'updated_at': '2024-04-28T09:55:24.355Z',
    }]
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, versions: versions },
      },
      stubs,
    })
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.length).toBe(3)
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.map(d => d.id).join(',')).toBe('1,3,2')
  })
  test('developers: multiple versions with only 1 developer', () => {
    const versions = [
      {
        'id': '9e5e5d21-d1e5-43b8-942f-9446de7b9893',
        'name': '8.2.9',
        'description': 'Innovative value-added moratorium',
        'developer': {
          'id': '1',
          'name': 'Edgar Hessel',
          'email': 'Edgar.Hessel19@hotmail.com',
          'avatar': 'https://avatars.githubusercontent.com/u/50583621',
        },
        'updated_at': '2024-07-27T13:22:20.979Z',
      },
      {
        'id': '6c77f4e6-24b9-4dc2-b0b7-5ecaf9764315',
        'name': '0.6.4',
        'description': 'Secured upward-trending alliance',
        'developer': {
          'id': '1',
          'name': 'Edgar Hessel',
          'email': 'Edgar.Hessel19@hotmail.com',
          'avatar': 'https://avatars.githubusercontent.com/u/50583621',
        },
        'updated_at': '2024-04-28T09:55:24.355Z',
      }]
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, versions: versions },
      },
      stubs,
    })
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.length).toBe(1)
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.map(d => d.id).join(',')).toBe('1')
  })
  test('developers: multiple versions with ordering by date', () => {
    const versions = [
      {
        'id': '9e5e5d21-d1e5-43b8-942f-9446de7b9893',
        'name': '8.2.9',
        'description': 'Innovative value-added moratorium',
        'developer': {
          'id': '3',
          'name': 'Edgar Hessel',
          'email': 'Edgar.Hessel19@hotmail.com',
          'avatar': 'https://avatars.githubusercontent.com/u/50583621',
        },
        'updated_at': '2020-07-27T13:22:20.979Z',
      },
      {
        'id': '6c77f4e6-24b9-4dc2-b0b7-5ecaf9764315',
        'name': '0.6.4',
        'description': 'Secured upward-trending alliance',
        'developer': {
          'id': '1',
          'name': 'Edgar Hessel',
          'email': 'Edgar.Hessel19@hotmail.com',
          'avatar': 'https://avatars.githubusercontent.com/u/50583621',
        },
        'updated_at': '2024-04-28T09:55:24.355Z',
      }]
    const wrapper = shallowMount(ServiceCard, {
      props: {
        service: { ...service, versions: versions },
      },
      stubs,
    })
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.length).toBe(2)
    // @ts-expect-error TODO: Fix in finalizing.
    expect(wrapper.vm.developers.map(d => d.id).join(',')).toBe('1,3')
  })

})
