<template>
  <KongMessage
    v-if="error"
    :message="error.message"
    :severity="error.severity"
  />
  <div class="service-catalog">
    <div class="header">
      <div class="text">
        <h1>Service Hub</h1>
        <p>
          Organize services, manage and track versioning and API service documentation. <a
            href="https://docs.konghq.com/konnect/"
            target="_blank"
          >Learn more</a>
        </p>
      </div>
      <div class="actions">
        <input
          v-model="search"
          class="search-input"
          data-testid="search-input"
          placeholder="Search services"
        >
        <a
          class="create-service-button"
          onclick="alert('Created a service')"
        >
          <img
            alt="Create Service Package"
            src="/icons/add.svg"
          >Service Package
        </a>
      </div>
    </div>
    <div
      v-if="loading"
      class="loader"
    >
      Loading services...
    </div>
    <div
      v-if="services && services.length"
      class="catalog"
    >
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
        @title-click="() => setActiveService(service)"
        @version-click="() => setActiveService(service)"
      />
    </div>
    <div
      v-else
      class="empty-results"
      data-testid="empty-results"
    >
      <p>
        Uh-oh! No services were found.
      </p><p>
        Try a good ole fashioned <RouterLink to="">
          Refresh
        </RouterLink>
      </p>
    </div>
    <Pager
      v-if="services && services.length"
      :items-per-page="pager.itemsPerPage.value"
      :page="pager.page.value"
      :total="pager.total()"
      @next="pager.next"
      @prev="pager.prev"
    />
  </div>
  <Modal
    v-if="activeService"
    v-show="activeService "
    @close="unsetActiveService"
  >
    <template #header>
      <h2>{{ versions > 0 ? `${activeService.name}: Versions (${versions})`: 'No versions' }}</h2>
    </template>
    <template #body>
      <ServiceTable :service="activeService" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref, type ComputedRef } from 'vue'
import useServices, { type Service } from '@/composables/useServices'
import ServiceCard from '@/components/service/ServiceCard.vue'
import Pager from '../common/KonnectPager.vue'
import Modal from '@/components/common/KonnectModal.vue'
import ServiceTable from '@/components/service/ServiceVersionTable.vue'
import { RouterLink } from 'vue-router'
import KongMessage from '../common/KongMessage.vue'

// Import services from the composable
const { services, loading, error, getServices, pager, search } = useServices()

const activeService = ref<Service>()

const versions: ComputedRef<number> = computed(() => {
  return activeService.value?.versions ? activeService.value.versions.length : 0
})

function setActiveService(service: Service) {
  activeService.value = service
}
function unsetActiveService() {
  activeService.value = undefined
}

getServices()
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.actions {
  align-items: center;
  display: flex;
  gap: 10px;
  justify-content: space-between;

  @media (min-width: $breakpoint_med_min) {
    gap: 20px;
  }
}

.loader {
  text-align: center;
}

p {
  color: #3C4557;
  font-size: 1.6rem;
  line-height: 1.5;

  a {
    text-decoration: none;
  }
}

.create-service-button {
  align-items: center;
  background: #07A88D;
  border-radius: 100px;
  /* White */
  color: #FFFFFF;
  display: flex;
  flex-direction: row;
  font-size: 1.6rem;
  font-weight: 600;
  gap: 8px;
  line-height: 1;
  padding: 12px 24px 12px 16px;
  text-align: center;

  &:hover {
    background: #6e9df1;
    cursor: pointer;
  }
}

.service-catalog {
  --card-columns: 1;
  --grid-columns: 1;
  --grid-column-gap: 20px;
  --grid-row-gap: 20px;
  max-width: 100%;
  width: 100%;

  @media (min-width: $breakpoint_med_min) {
    --card-columns: 2;
    --grid-column-gap: 30px;
    --grid-row-gap: 30px;
  }

  @media (min-width: $breakpoint_lg_min) {
    --card-columns: 3
  }
}

.header,
.catalog {
  column-gap: var(--grid-column-gap);
  display: grid;
  grid-template-columns: repeat(var(--card-columns), 1fr);
  justify-content: center;
  margin: 0 auto;
  row-gap: var(--grid-row-gap);
}

.header {
  margin-bottom: 20px;

  @media (min-width: $breakpoint_lg_min) {
    .text {
      grid-column: 1 / span 2;
    }
  }
}

.search-input {
  background: url('/icons/search.svg') no-repeat 10px 8px #FFFFFF;
  border: 1px solid #E7E7EC;
  border-radius: 4px;
  padding: 10px 16px 10px 40px;
}

.empty-results {
  font-size: 2.2rem;
  padding: 20px;
  text-align: center;
}
</style>
