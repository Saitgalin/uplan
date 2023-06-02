<template>

  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    router='router'
    v-if='isAuth'
  >
    <el-menu-item route='createPlan' index="1">CreatePlan</el-menu-item>
    <el-menu-item route='plans' index="2">Plans</el-menu-item>
    <el-menu-item @click='handleLogout' index='3'>Logout</el-menu-item>

  </el-menu>
</template>

<script setup lang='ts'>
import { useAuthStore } from '../store';
import { computed } from 'vue';

const authStore = useAuthStore()

const isAuth = computed(() => authStore.token != null)

const handleLogout = () => {
  authStore.logout()
}

</script>