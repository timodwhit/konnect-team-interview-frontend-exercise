import { describe, expect, test } from 'vitest'
import AppHeader from './AppHeader.vue'
import { mount } from '@vue/test-utils'

describe('Appeader tests', () => {
  test('loads', async () => {
    const wrapper = mount(AppHeader)
    // Just make sure it loads.
    expect(wrapper.findTestId('header').isVisible()).toBeTruthy()
  })
})