<template>
  <SidebarLogo :baseSideIsCollapse="props.baseSideIsCollapse"></SidebarLogo>
  <el-menu
    :default-active="defautActiveIndex"
    class="el-menu-vertical"
    :collapse="props.baseSideIsCollapse"
    active-text-color = "#409EFF"
    @open="handleOpen"
    @close="handleClose"
    :router="true"
    :collapse-transition="false"
  >
    <el-menu-item index="/dashbord">
      <el-icon><Histogram /></el-icon>
      <template #title>Dashbord</template>
    </el-menu-item>
    <el-menu-item index="/console">
      <el-icon><document /></el-icon>
      <template #title>控制台</template>
    </el-menu-item>
    <el-menu-item index="/analysis" >
      <el-icon><DataAnalysis /></el-icon>
      <template #title>分析页</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  import { ref, onMounted, onUpdated, watch } from 'vue'
  import {
  Location,
  Document,
  Menu as IconMenu,
  Setting,
  Edit,
  Expand,
  Histogram,
  DataAnalysis
  } from '@element-plus/icons-vue'
  import SidebarLogo from './components/SideBar/SideBarLogo.vue'
  interface Props {
    baseSideIsCollapse: boolean
  }
  //设置属性
  const props = withDefaults(defineProps<Props>(),{
    baseSideIsCollapse: false
  });

  const isCollapse = ref(false);
  const defautActiveIndex = ref("");
  const router = useRouter();
  watch(router.currentRoute, (route, prevRoute) => {
      defautActiveIndex.value = route.path
  })
  onMounted(() =>
  {
    defautActiveIndex.value = router.currentRoute.value.path;
  })

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
<style scoped>
.el-menu-vertical {
  position: relative;
  height: 100%;
}
</style>
