<template>
  <header
    class="nav"
    data-testid="header"
  >
    <router-link
      class="logo"
      to="/"
    >
      <img
        alt="Home"
        src="/logo.svg"
      >
    </router-link>
    <div class="nav-links">
      <router-link to="/">
        <OrganizationIcon />
        <span class="name">Organization</span>
      </router-link>
      <router-link to="/">
        <SettingsIcon /><span class="name">Settings</span>
      </router-link>
      <router-link
        class="profile"
        to="/"
      >
        <ProfileIcon /> <span class="name">Katherine Ellis</span>
      </router-link>
    </div>
  </header>
</template>

<script setup lang="ts">
import OrganizationIcon from '@/components/icons/OrganizationIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import ProfileIcon from '@/components/icons/ProfileIcon.vue'
</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables";

.nav {
  background: linear-gradient(180deg, #09224F 0%, #073382 100%);
  display: flex;
  justify-content: space-between;
  padding: 0;
}

.logo {
  padding: 20px 0
}

.nav-links {
  color: #ced5e1;
  display: flex;
  gap: 20px;

  a {
    align-items: center;
    color: #ced5e1;
    display: flex;
    font-size: 15px;
    font-weight: 600;
    gap: 10px;
    line-height: 18px;
    padding: 20px 10px;
    text-decoration: none;

    &.profile {
      background: #072863;
      color: white;
      font-weight: 400;
      padding: 20px;
    }

    &:hover {
      color: #bee2ff;
    }
  }
}

.name {
  display: none;

  @media (min-width: $breakpoint_med_max) {
    display: inline;
  }
}
</style>
