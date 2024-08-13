import { customRef } from 'vue'
// This was taken from: https://vuejs.org/api/reactivity-advanced.html#customref
export function useDebouncedRef(value: any, delay = 200) {
  let timeout: ReturnType<typeof setTimeout>
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}
