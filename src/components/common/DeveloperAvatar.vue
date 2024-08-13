<template>
  <RouterLink
    class="avatar"
    data-testid="developer-link"
    :to="`/developer/${developer.id}`"
  >
    <img
      class="avatar-image"
      :src="developer.avatar"
      :title="developer.name"
    >
  </RouterLink>
</template>

<script setup lang="ts">
import type { Developer } from '@/composables/useServices'
import { RouterLink } from 'vue-router'
defineProps<{ developer: Developer }>()
</script>

<style scoped lang="scss">
.avatar {
  line-height: 0;
  text-decoration: none;

  &:hover {
    z-index: 99;
  }
}

.avatar-image {
  border-radius: 50%;
  height: 40px;
  max-height: 100%;
  max-width: 100%;
  width: 40px;
}
</style>