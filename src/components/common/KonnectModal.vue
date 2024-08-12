<template>
  <div
    class="wrapper"
  >
    <div
      class="modal-backdrop"
      @click="close"
    />
    <div class="modal">
      <header class="modal-header">
        <slot name="header" />
        <button
          class="btn-close"
          type="button"
          @click="close"
        >
          x
        </button>
      </header>

      <section
        v-if="$slots.body"
        class="modal-body"
      >
        <slot name="body" />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
// Add function to emit the close event.
function close() {
  emit('close')
}
</script>

<style lang="scss" scoped>
.wrapper {
  align-items: center;
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  overflow: auto;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
}

// Add a backdrop overlay to hide all content below modal.
.backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
}

.modal {
  background: #FFFFFF;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  // VH/VW used here to make sure that it is relative to the viewer
  margin: 3vh 2vw;
  max-height: 100%;
  overflow: auto;
  z-index: 1;
}

.modal-header {
  color: #0B172D;
  justify-content: space-between;
  padding: 0 20px 0;
  position: relative;
}

.modal-body {
  padding: 0px 20px;
  position: relative;
}

.btn-close {
  background: transparent;
  border: none;
  color: #aaa;
  cursor: pointer;
  font-size: 2rem;
  font-weight: bold;
  line-height: 0.6;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
