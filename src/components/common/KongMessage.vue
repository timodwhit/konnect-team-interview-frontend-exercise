<template>
  <div
    :class="`message ${severity}` "
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
export type Message = { severity: 'warn' | 'error' | 'notice', message: string }

defineProps<Message>()

</script>

<style lang="scss">
 .message {
  --message-background: #d3f9d8;
  --message-border: #2f9e44;
  --message-color: #2f9e44;
  background-color: var(--message-background);
  border: 1px solid var(--message-border);
  border-radius: 4px;
  color: var(--message-color);
  font-size: 1.3rem;
  padding: 10px;
  &.error {
    --message-background: #ffe3e3;
    --message-border: #c92a2a;
    --message-color: #c92a2a;
  }
  &.warning {
    --message-background: #ffe8cc;
    --message-border: #e8590c;
    --message-color: #e8590c;
  }
}
</style>