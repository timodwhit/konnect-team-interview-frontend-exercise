<template>
  <AppHeader />
  <main>
    <router-view />
  </main>
</template>

<script setup lang="ts">
import AppHeader from '@/components/common/AppHeader.vue'
</script>

<style lang="scss">
:root {
  --max-container-width: 1320px;
}
// Smooth the font out.
* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// Unscoped styles for html and body
html {
  background: #F8F8FA;
  font-size: 62.5%;
}

body {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1.2;
  margin: 0 auto;
}
main {
  margin: 2rem auto;
  max-width: var(--max-container-width);
  padding: 0 20px;
}

h1 {
  color: #3C4557;
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.125;
}
h2 {
  /* identical to box height, or 150% */
  color: #0B172D;
  font-size: 1.6rem;
  /* Versions (2) */
  font-style: normal;
  font-weight: 600;
  line-height: 2.4rem;
}
</style>
