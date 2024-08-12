<template>
  <article
    v-if="service"
    class="service"
  >
    <div class="top">
      <div class="header">
        <div
          class="publish-state"
          data-test="published-state"
        >
          <span>
            <img
              :alt="publishedState.title"
              :src="publishedState.icon"
            >
            {{ publishedState.title }}
          </span>
        </div>
        <div
          v-if="service.versions && service.versions.length > 0"
          class="versions"
        >
          <div
            class="version-button"
            data-test="versions"
            @click="versionClick"
          >
            {{ service?.versions.length === 1 ? service.versions.length + ' version' : service.versions.length + ' versions' }}
          </div>
        </div>
      </div>
      <div class="info">
        <h2
          class="name"
          data-test="name"
        >
          <RouterLink :to="`/service/${service.id}`">
            {{ service.name }}
          </RouterLink>
        </h2>
        <p
          class="description"
          data-test="description"
        >
          {{ service.description }}
        </p>
      </div>
    </div>
    <div class="bottom">
      <ServiceMetrics
        :configured="service?.configured"
        data-test="metrics"
        :metrics="service?.metrics"
      />
      <DeveloperAvatarStack
        data-test="developers"
        :developers="developers"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Developer, Service } from '@/composables/useServices'
import ServiceMetrics from '@/components/service/ServiceMetrics.vue'
import { computed } from 'vue'
import DeveloperAvatarStack from '../common/DeveloperAvatarStack.vue'

const props = defineProps<{ service: Service }>()
// Compute the developers of the service.
const developers = computed(() => {
  if (!props.service?.versions) {
    return []
  }
  const developerIds: string[] = []
  // NOTE: The developers are displayed in order of the developer who last published a release.
  const sortedVersions = props.service.versions.toSorted((v1, v2) => (new Date(v2.updated_at).getTime() - new Date(v1.updated_at).getTime()))
  return sortedVersions.reduce((acc, version) => {
    const { developer } = version
    // Not all versions have a developer.
    if (!developer) {
      return acc
    }
    // If the develop id has shown up before move on.
    if (developerIds.includes(developer.id)) {
      return acc
    }
    acc.push(developer)
    developerIds.push(developer.id)
    return acc
  }, [] as Developer[])
})

const publishedState = computed(() => {
  const { service } = props
  if (service.published && service.configured) {
    return {
      icon: '/icons/checkmark.svg',
      title: 'Published to portal',
    }
  }
  if (!service.published && service.configured) {
    return {
      icon:'/icons/unpublished.svg',
      title:'Unpublished',
    }
  }
  return {
    icon: '/icons/progress.svg',
    title: 'In progress',
  }
})

// Define events to emit.
const emit = defineEmits(['version-click'])
function versionClick() {
  emit('version-click')
}

</script>

<style scoped lang="scss">
.service {
  background: #FFFFFF;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 25px;
}

.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  min-height: 30px;
}

.bottom {
  align-content: flex-end;
  display: flex;
  justify-content: space-between;
}

h2 {
  margin-top: 0;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      color: #102141;
    }
  }
}

.publish-state {
  color: #3C4557;
  font-size: 1.2rem;
  line-height: 1.25;
  // This allows for th center of the icon to align with the start of the title
  margin-left: -8px;
  opacity: 0.7;

  > span {
    align-items: center;
    display: flex;
    gap: 5px;
  }
}

.info {
  min-height: 90px;
}

.name {
  color: #3C4557;
  font-size: 2.0rem;
  font-weight: 600;
  line-height: 1.2;
}

.description {
  -webkit-box-orient: vertical;
  color: #707888;
  display: -webkit-box;
  font-size: 1.3rem;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: 1.5;
  overflow: hidden;
}

.version-button {
  background: #F2F6FE;
  border-radius: 100px;
  color: #5888DB;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1;
  padding: 9px 16px 8px;

  &:hover {
    background: #5888DB;
    color: #F2F6FE;
    cursor: pointer;
  }
}
</style>
