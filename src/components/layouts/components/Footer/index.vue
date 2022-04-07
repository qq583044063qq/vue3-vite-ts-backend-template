<script setup lang="ts">
import ApplicationSetting from '@/setting'
let currentYear =new Date().getFullYear()
</script>
<template>
  <div class="app-footer-warp">
      <div class="app-footer">
         &copy;{{currentYear}} 改造vue-element-admin,自用后台管理系统模板，<a class="app-footer-link" :href="ApplicationSetting.githubUrl" target="_blank">项目地址</a>
      </div>
  </div>
</template>
<style lang="scss" scoped>
.app-footer-warp {
    height: 100%;
    display: flex;
    justify-content: center;
    font-size: smaller;
    align-items: center;
    background-color: #e9e7e7;
    .app-footer-link {
      transition: all 0.3s;
      &:hover {
      color: rgba(247, 84, 173, 0.788);
      }
    }
}
</style>