<template>
  <a
    v-if="developer"
    class="avatar"
    :href="`/developer/${developer.id}`"
  >
    <img
      class="avatar-image"
      :src="developer.avatar"
      :title="developer.name"
    >
  </a>
</template>

<script setup lang="ts">
import type { Developer } from '@/composables/useServices'
defineProps<{ developer?: Developer }>()
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