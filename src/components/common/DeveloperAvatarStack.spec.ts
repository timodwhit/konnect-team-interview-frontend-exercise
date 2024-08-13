import { describe, expect, test } from 'vitest'
import DeveloperAvatar from './DeveloperAvatar.vue'
import DeveloperAvatarStack from './DeveloperAvatarStack.vue'
import { RouterLinkStub, shallowMount } from '@vue/test-utils'

describe('DeveloperAvatarStack tests', () => {
  test('single developer - not-repeated', async () => {
    const developers = [
      {
        'id': 'b6d33d6f-eabc-4ef8-938e-abb68794e899',
        'name': 'Edgar Hessel',
        'email': 'Edgar.Hessel19@example.com',
        'avatar': 'https://avatars.githubusercontent.com/u/50583621',
      },
    ]
    const wrapper = shallowMount(DeveloperAvatarStack, {
      props: {
        developers,
      },
      stubs: {
        RouterLink: RouterLinkStub,
      },
    })
    expect(wrapper.findAllComponents(DeveloperAvatar)).toHaveLength(1)
  })
})