<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { key } from '../../store';
import AdminDashboard from './admin/index.vue'
import UserDashboard from './user/index.vue'
const store = useStore(key)
</script>
<template>
  <div class="dashboard-container">
    <component :is="store.getters.userRoles.indexOf('administrator')==-1?UserDashboard:AdminDashboard" />
  </div>
</template>