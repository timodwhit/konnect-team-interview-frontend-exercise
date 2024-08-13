<template>
  <table v-if="sortedVersions && service">
    <tr
      v-for="version in sortedVersions"
      :key="version.id"
    >
      <td class="version">
        {{ version.name }}
      </td>
      <td class="description">
        {{ version.description }}
      </td>
      <td class="type">
        <div :class="`type-label  type-label-${service.type.toLowerCase()}`">
          {{ service.type }}
        </div>
      </td>
      <td>
        <div
          v-if="version.developer"
          class="developer"
        >
          <Avatar
            class="avatar"
            :developer="version.developer"
          />
          <div class="name">
            {{ version.developer.name }}
            <div class="date">
              {{ version.formatted_date }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="date"
        >
          {{ version.formatted_date }}
        </div>
      </td>
    </tr>
  </table>
  <div v-else>
    No versions found. Learn how to create a new version here
  </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import type { Service, Version } from '@/composables/useServices'
import Avatar from '@/components/common/DeveloperAvatar.vue'
// Define the props.
const props = defineProps<{ service?: Service }>()

type FormattedVersion = Version & { formatted_date: string }

const timeAgo = (date_string: string) => {
  const date = new Date(date_string)
  const formatter = new Intl.RelativeTimeFormat('en')
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  }
  const secondsElapsed = (date.getTime() - Date.now()) / 1000
  let key: keyof typeof ranges
  for (key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key]
      return formatter.format(Math.round(delta), key)
    }
  }
  return date_string
}

const sortedVersions = computed(() => {
  if (!props.service) {
    return
  }
  const { versions } = props.service
  if (!versions) {
    return
  }
  return [...versions]
    .sort((v1, v2) => (new Date(v2.updated_at).getTime() - new Date(v1.updated_at).getTime()))
    .reduce((acc, v) => {
      // Map a date change to the version, this allows it to be cached.
      acc.push({ ...v, formatted_date: timeAgo(v.updated_at) })
      return acc
    }, [] as FormattedVersion[])
})
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";
table {
  border-collapse: collapse;
  width: 100%;
}

tr {
  align-items: center;
  border-bottom: 1px solid #F1F1F5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &:last-of-type {
    border-bottom: 0;
  }
   @media (min-width: $breakpoint_med_min) {
    display: table-row;
  }
}

td{
  display: block;
  gap: 1rem;
  padding: 0.5rem 0;
   @media (min-width: $breakpoint_med_min) {
    display: table-cell;
    padding: 15px;
    &:first-of-type {
      padding-left: 0;
    }
    &:last-of-type {
      padding-right: 0
    }
  }
}


.version {
  color: #262626;
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 2.4rem;

}

.description {
  color: #8A8A8A;
  font-size: 1.2rem;
  line-height: 1.6rem;
  width: 100%;
   @media (min-width: $breakpoint_med_min) {
    max-width: 320px;
    padding-right: 50px;
    width: auto;
  }
}


.type-label {
  background: #f8f8f8;
  border-radius: 4px;
  color: #1155CB;
  display: inline-block;
  font-size: 1.0rem;
  font-weight: 500;
  line-height: 1.4rem;
  padding: 1.5px 6px 2.5px;
}

// @TODO: This is not ideal.
.type-label-rest {
  background-color: #bdd3f9;
}

.date {
  color: #8A8A8A;
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
}

.developer {
  align-items: center;
  display: flex;
  gap: 10px;
  .avatar {
    height: 25px;
    width: 25px;
  }
  .name {
    color: #3C4557;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1;
    padding-top: 12.5px;
  }
}

</style>
