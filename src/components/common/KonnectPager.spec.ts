import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import KonnectPager from './KonnectPager.vue'

describe('KonnectPager tests', () =>{
  test('first page', () => {
    const wrapper = mount(KonnectPager, { props: {
      page: 0,
      itemsPerPage: 9,
      itemName: 'services',
      total: 18,
    } })
    expect(wrapper.findTestId('prev-page-link').exists()).toBeFalsy()
    expect(wrapper.findTestId('prev-page-disabled').exists()).toBeTruthy()
    expect(wrapper.findTestId('next-page-link').exists()).toBeTruthy()
    expect(wrapper.findTestId('next-page-disabled').exists()).toBeFalsy()
    expect(wrapper.findTestId('pager-text').text()).toBe('1 to 9 of 18 services')
  })
  test('middle page ', () => {
    const wrapper = mount(KonnectPager, { props: {
      page: 1,
      itemsPerPage: 9,
      itemName: 'services',
      total: 24,
    } })
    expect(wrapper.findTestId('prev-page-link').exists()).toBeTruthy()
    expect(wrapper.findTestId('prev-page-disabled').exists()).toBeFalsy()
    expect(wrapper.findTestId('next-page-link').exists()).toBeTruthy()
    expect(wrapper.findTestId('next-page-disabled').exists()).toBeFalsy()
    expect(wrapper.findTestId('pager-text').text()).toBe('10 to 18 of 24 services')
  })
  test('last page ', () => {
    const wrapper = mount(KonnectPager, { props: {
      page: 1,
      itemsPerPage: 9,
      itemName: 'services',
      total: 18,
    } })
    expect(wrapper.findTestId('prev-page-link').exists()).toBeTruthy()
    expect(wrapper.findTestId('prev-page-disabled').exists()).toBeFalsy()
    expect(wrapper.findTestId('next-page-link').exists()).toBeFalsy()
    expect(wrapper.findTestId('next-page-disabled').exists()).toBeTruthy()
    expect(wrapper.findTestId('pager-text').text()).toBe('10 to 18 of 18 services')
  })
  test('last page with single item', () => {
    const wrapper = mount(KonnectPager, { props: {
      page: 1,
      itemsPerPage: 9,
      itemName: 'services',
      total: 10,
    } })
    expect(wrapper.findTestId('prev-page-link').exists()).toBeTruthy()
    expect(wrapper.findTestId('prev-page-disabled').exists()).toBeFalsy()
    expect(wrapper.findTestId('next-page-link').exists()).toBeFalsy()
    expect(wrapper.findTestId('next-page-disabled').exists()).toBeTruthy()
    expect(wrapper.findTestId('pager-text').text()).toBe('10 of 10 services')
  })
  test('no pages', () => {
    const wrapper = mount(KonnectPager, { props: {
      page: 1,
      itemsPerPage: 9,
      itemName: 'services',
      total: 4,
    } })
    expect(wrapper.findTestId('pager-container').exists()).toBeFalsy()
  })

})