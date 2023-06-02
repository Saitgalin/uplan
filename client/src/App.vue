<script setup lang='ts'>
import AppNavigation from './components/AppNavigation.vue';
import { useAuthStore } from './store';

const authStore = useAuthStore();
</script>

<template>
  <div id='app'>
    <AppNavigation v-if='authStore.token != null' />

    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<style scoped>
</style>
