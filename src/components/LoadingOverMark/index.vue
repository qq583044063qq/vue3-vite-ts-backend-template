<script setup lang="ts">
import loadingImage from '@/assets/images_load.gif'
</script>
<template>
  <div class="overMark-container">
    <div class="loading">
      <span class="icon"><img :src="loadingImage"/></span>
      <span class="text">正在加载中...</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.overMark-container{
  position: absolute;
  height: 100%;
  width: 100%;
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .icon {
      width: 200px;
      height: 200px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      color: #999;
      font-size: 16px;
    }
  }
}
</style>