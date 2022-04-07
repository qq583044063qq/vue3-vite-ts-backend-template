<script setup lang="ts">
import PanThumb from '@/components/PanThumb/index.vue'
import Mallki from '@/components/TextHoverEffect/Mallki.vue'
import { key } from '@/store/index'
import { computed } from 'vue';
import { useStore } from 'vuex'
const store = useStore(key)
</script>
<template>
  <el-card
    class="box-card-component"
    style="margin-left:8px;"
  >
    <div
      slot="header"
      class="box-card-header"
    >
      <img src="@/assets/boxCard-miku.jpg">
    </div>
    <div style="position:relative;">
      <PanThumb
        :image="store.getters.userAvatar"
        class="panThumb"
      />
      <Mallki
        class="mallki-text"
        :text="store.getters.userName"
      />
      <div
        style="padding-top:35px;"
        class="progress-item"
      >
        <span>Vue</span>
        <el-progress :percentage="51" />
      </div>
      <div class="progress-item">
        <span>Typescript</span>
        <el-progress :percentage="45" />
      </div>
      <div class="progress-item">
        <span>CSS</span>
        <el-progress :percentage="4" />
      </div>
      <div class="progress-item">
        <span>ESLint</span>
        <el-progress
          :percentage="100"
          status="success"
        />
      </div>
    </div>
  </el-card>
</template>

<style lang="scss">
.box-card-component {
  .el-card__header {
    padding: 0px!important;
  }
}

.panThumb {
  z-index: 100;
  height: 70px!important;
  width: 70px!important;
  position: absolute!important;
  top: -45px;
  left: 0px;
  border: 5px solid #ffffff;
  background-color: #fff;
  margin: auto;
  box-shadow: none!important;

  .pan-info {
    box-shadow: none!important;
  }
}
</style>
<style scoped lang="scss">
.box-card-component {
  .box-card-header {
    position: relative;
    height: 220px;

    img {
      width: 100%;
      height: 100%;
      transition: all 0.2s linear;

      &:hover {
        transform: scale(1.1, 1.1);
        filter: contrast(130%);
      }
    }
  }

  .mallki-text {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 20px;
    font-weight: bold;
  }

  .progress-item {
    margin-bottom: 10px;
    font-size: 14px;
  }

  @media only screen and (max-width: 1510px){
    .mallki-text{
      display: none;
    }
  }
}
</style>