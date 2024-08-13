<template>
  <div class="stack">
    <Avatar
      v-for="developer in developerStack.stack"
      :key="developer.id"
      class="avatar"
      :developer="developer"
    />
    <div
      v-if="developerStack.count > 0"
      class="avatar avatar-count"
    >
      {{ `+${developerStack.count}` }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Developer } from '@/composables/useServices'
import { computed } from 'vue'
import Avatar from './DeveloperAvatar.vue'
export interface Props {
  developers?: Developer[],
  stackSize?: number
}

// Add defaults to the props.
const props = withDefaults(defineProps<Props>(), { developers: () => [], stackSize: 2 })

// Generate the developer stack to display.
const developerStack = computed(() => {
  let count = 0
  const stack: Developer[] = []
  const usedDevelopers: string[] = []
  props.developers.forEach(dev => {
    if (usedDevelopers.includes(dev.id)) {
      return
    }
    // Mark this developer was used
    usedDevelopers.push(dev.id)

    // If we haven't met the stack size, go ahead and add the developer.
    if (stack.length < props.stackSize) {
      stack.push(dev)
      return
    } else {
      // Increment the count for the stack in this case, so we know how many other developer were present.
      count++
    }
  })
  return { stack, count }
})

</script>
<style scoped lang="scss">
.stack {
  --stack-overlap: 15px;
  align-items: flex-end;
  display: flex;
  // We reverse the flow of the items to get the z-index right.
  flex-direction: row-reverse;
  // We need to account for the stack overlap with flex.
  padding-right: var(--stack-overlap);
}

.avatar {
  margin-right: calc(var(--stack-overlap) * -1);
  z-index: 0;
}

.avatar-count {
  --avatar-size: 4rem;
  background: #F1F1F8;
  border: 2px solid #FFFFFF;
  border-radius: 50%;
  color: #777D8A;
  font-size: 1.3rem;
  font-size: 12px;
  font-weight: 600;
  height: var(--avatar-size);
  line-height: var(--avatar-size);
  text-align: center;
  width: var(--avatar-size);
  z-index: 1;
}
</style>
