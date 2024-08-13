import { ref } from 'vue'
import type { Ref } from 'vue'
import axios, { AxiosError } from 'axios'
import { useDebouncedRef } from './useDebouncedRef'
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Message } from '@/components/common/KongMessage.vue'

// This composable is a simplified example for the exercise **and could likely be improved**.
// Feel free to leave as-is, modify, or remove this file (and any others) as desired.
// https://vuejs.org/guide/reusability/composables.html

export type Version = {
  id: string;
  name: string;
  description: string;
  updated_at: string
  developer?: Developer
}

export type Developer = {
  id: string,
  name: string,
  email: string,
  avatar: string;
}

export type Service = {
  id: string;
  name: string;
  description: string;
  type: 'REST';
  published: boolean;
  configured: boolean;
  versions?: Version[];
  metrics?: {
    latency: number;
    uptime: number;
    requests: number;
    errors: number;
  }
}

type ServiceLoader = {
  services: Ref<Service[]>,
  loading: Ref<boolean>,
  error: Ref<Message | undefined>,
  getServices: () => void,
  search: Ref<string>,
  pager: {
    next: () => void,
    prev: () => void,
    page: Ref<number>,
    itemsPerPage: Ref<number>,
    total: () => number,
  }
}

export default function useServices(): ServiceLoader {
  const services = ref<Service[]>([])
  const allServices = ref<Service[]>([])
  const loading = ref<boolean>(false)
  const error = ref<Message | undefined>()
  // This is a ref, because maybe we'll change it one day dynamically to show more services per page.
  const itemsPerPage = ref<number>(9)
  const router = useRouter()
  const route = useRoute()
  const page = ref<number>(Number(route.query.page ?? 0))
  // Initial load will be based on the query parameter.
  // After that the ref will be used and updated the search as needed.
  const search = useDebouncedRef(route.query.search ?? '')

  // Set the displayed services to the limit
  const setServices = () => {
    const start = page.value * itemsPerPage.value
    const end = start + itemsPerPage.value
    services.value = [...allServices.value].slice(start, end)
  }

  const getServices = async (): Promise<void> => {
    try {
      // Initialize loading state
      loading.value = true
      error.value = undefined

      const params = {}
      // Add the search parameter if there is a length.
      if (search.value && search.value.length) {
        Object.assign(params, { q: search.value })
      }
      // Fetch data from the API
      const { data } = await axios.get('/api/services', { params })
      // Store data in Vue ref
      allServices.value = data ?? []
      setServices()
    } catch (err: any) {
      // @TODO: Add the nice error handling here, maybe return error message instead of bool.
      // Reset loading state
      loading.value = false
      // Trigger the error
      error.value = {
        severity: 'error',
        message: err instanceof AxiosError ? err.message : 'Unknown Error: ' + err,
      }
    } finally {
      // Reset loading state
      loading.value = false
    }
  }

  const setSearch = async () => {
    // We need to reset the page when search is reset.
    page.value = 0
    // With the page reset and
    await getServices()
  }

  const updatePageParam = () => {
    router.push({ query: { ...route.query, page: page.value == 0 ? undefined : page.value } })
  }

  const nextPage = () => {
    const totalServices = allServices.value.length
    if (page.value * itemsPerPage.value > totalServices) {
      return
    }
    page.value++
    // Update the history.
    updatePageParam()
    setServices()
  }

  const prevPage = () => {
    if (page.value <= 0) {
      return
    }
    page.value--
    updatePageParam()
    setServices()
  }

  const totalServices = () => allServices.value.length

  watch(search, () => {
    router.push({ query: { ...route.query, search: search.value.length ? search.value : undefined, page: undefined } })
    setSearch()
  })

  // Return stateful data
  return {
    services,
    getServices,
    loading,
    error,
    search,
    pager: {
      next: nextPage,
      prev: prevPage,
      page,
      itemsPerPage,
      total: totalServices,
    },
  }
}
