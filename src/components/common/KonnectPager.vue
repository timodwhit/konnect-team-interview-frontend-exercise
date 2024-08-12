<template>
  <div
    v-if="total > itemsPerPage"
    class="container"
  >
    <div class="pager">
      <a
        :aria-disabled="start > 1"
        :class="start > 1? '': 'disabled'"
        :title="start > 1? `Prev page of ${itemName}`: 'No prior pages.'"
        @click="prev"
      >
        <LeftArrowIcon />
      </a>
      <div class="pager-description">
        <b v-if="start !== end">{{ start }} to {{ end }}</b>
        <b v-else> {{ start }}</b> of {{ total }} {{ itemName }}
      </div>
      <a
        :aria-disabled="end === total"
        :class="end !== total? '': 'disabled'"
        :title="end !== total ? `Next page of ${itemName}`: 'No more pages'"
        @click="next"
      >
        <RightArrowIcon />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import LeftArrowIcon from '../icons/LeftArrowIcon.vue'
import RightArrowIcon from '../icons/RightArrowIcon.vue'

export type Props = {
  page: number,
  itemsPerPage: number,
  total: number,
  itemName?: string
}
// Define the initial props.
const props = withDefaults(
  defineProps<Props>(),
  {
    page: 0,
    itemsPerPage: 9,
    itemName: 'services',
    total: 0,
  },
)

// Define the emits for the pager.
const emit = defineEmits(['next', 'prev'])

// Methods to emit standardly.
function next() {
  emit('next')
}
function prev() {
  emit('prev')
}

// Compute the values of start and end for ease of use.
const start = computed(() => props.page * props.itemsPerPage + 1)
const end = computed(() => {
  const proposedEnd = props.page * props.itemsPerPage + props.itemsPerPage
  // If the next page would have more items than the total, just state the total.
  return proposedEnd > props.total ? props.total : proposedEnd
})
</script>

<style lang="scss" scoped>
.container {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  width: 100%;
}

.pager {
  align-items: center;
  color: #3C4557;
  display: flex;
  font-size: 1.3rem;
  gap: 2.5rem;
  line-height: 2rem;
  text-align: center;
}

a {
  color: #1456CB;
  line-height: 0;

  &:hover {
    color: #6e9df1
  }

  &.disabled {
    color: #A6C6FF;
    cursor: not-allowed;
    opacity: 0.5;
    text-decoration: none;
  }
}
</style>
