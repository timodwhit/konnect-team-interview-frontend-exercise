import { describe, expect, test } from 'vitest'
import DeveloperAvatar from './DeveloperAvatar.vue'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'

describe('DeveloperAvatartests', () => {
  test('loads', async () => {
    const developer = {
      'id': 'b6d33d6f-eabc-4ef8-938e-abb68794e899',
      'name': 'Edgar Hessel',
      'email': 'Edgar.Hessel19@hotmail.com',
      'avatar': 'https://avatars.githubusercontent.com/u/50583621',
    }
    const wrapper = shallowMount(DeveloperAvatar, { props: { developer }, stubs: {
      RouterLink: RouterLinkStub,
    } })
    expect(wrapper.findTestId('developer-link').attributes().to).toBe('/developer/b6d33d6f-eabc-4ef8-938e-abb68794e899')
  })
})