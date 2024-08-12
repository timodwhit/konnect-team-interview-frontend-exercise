import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ServiceCatalog from './ServiceCatalog.vue'
import servicesData from '../../../mocks/services'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '@/router'

// Mock the axios module for fetching API services
const mockedResponses = new Map()
  .set('/api/services', vi.fn(() => ({
    data: servicesData,
  })))

vi.mock('axios', async () => {
  const actual: any = await vi.importActual('axios')
  return {
    default: {
      ...actual.default,
      // Mock get request responses
      get: (url: string) => vi.fn().mockResolvedValue(mockedResponses.get(url) !== undefined
        ? mockedResponses.get(url)()
        : undefined)(),
    },
  }
})
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
// Example component test for ServiceCatalog.vue
describe('ServiceCatalog', () => {

  it('shows the search input', async () => {
    // No `mockedResponses` modification needed; just use the default mocked response
    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findTestId('search-input').isVisible()).toBe(true)
  })

  it('properly handles no services returned from the API', async () => {
    const router = createRouter({
      history: createWebHistory(),
      routes: routes,
    })
    // Provide a custom `mockedResponses` response payload instead of using the default mocked response
    mockedResponses.get('/api/services').mockReturnValue({
      data: [],
    })

    const wrapper = mount(ServiceCatalog, {
      global: {
        plugins: [router],
      },
    })

    expect(wrapper.findTestId('empty-results').isVisible()).toBe(true)
  })
})
