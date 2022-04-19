<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import { key } from '../../store'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import Footer from './components/Footer/index.vue'
const store = useStore(key)
const router = useRouter()
const route = useRoute()
// const sideIsCollapse = ref(false);
const sideExpandChange = () => {
  store.commit('SET_SIDEBAR', !store.getters.sideBarIsCollapse)
  // sideIsCollapse.value = !sideIsCollapse.value;
}
const confirmLogout = () => {
  store.dispatch('user/logout').then(() => {
    router.push('/login?redirect=' + route.fullPath)
  }).catch(err => {
    ElMessage({
      type: 'error',
      message: err,
    })
  })
}
</script>
<template>
  <div class="base-container">
    <div class="base-sidebar-container" :class="{'   base-sidebar-isclose': store.getters.sideBarIsCollapse}   ">
      <BaseSide :baseSideIsCollapse="store.getters.sideBarIsCollapse" />
    </div>
    <div
      class="base-main-container"
      :class="{'   base-main-container-sidebar-isclose': store.getters.sideBarIsCollapse}   "
    >
      <div>
        <el-header style="padding: 0; height: 50px;">
          <BaseHeader
            :baseSideIsCollapse="store.getters.sideBarIsCollapse"
            @sideExpandChange="sideExpandChange"
            @userLogout="confirmLogout"
          />
        </el-header>
      </div>
      <!-- 默认最小高度为整个屏幕高度减去头50px+1px和底部53px -->
      <div class="app-main">
        <routerView></routerView>
      </div>
      <!-- 93px高度的底部栏 -->
      <div class="app-footer">
        <Footer></Footer>
      </div>
    </div>
  </div>
  <!-- <el-container class="base-container">
    <el-aside width="200px">
      <BaseSide :baseSideIsCollapse="sideIsCollapse" />
    </el-aside>
    <el-container>
      <el-header style="padding: 0; height: 50px;">
        <BaseHeader :baseSideIsCollapse="sideIsCollapse" @sideExpandChange="sideExpandChange" />
      </el-header>
      <el-main>
        <div>
          <routerView></routerView>
        </div>
      </el-main>
    </el-container>
  </el-container>-->
</template>
<style scoped lang="scss">
.base-container {
  position: relative;
  height: 100%;
  width: 100%;
}
.base-sidebar-container {
  transition: width 0.28s;
  width: 210px;
  /* background-color: #304156; */
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.base-main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
}
.base-main-container-sidebar-isclose {
  margin-left: 64px;
}
.base-sidebar-isclose {
  width: 64px;
}
.app-main {
  height: calc(100vh - 104px);
  width: 100%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}
  .app-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width : 5px;  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
  }
  .app-main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius   : 5px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
  }
  .app-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow   : none;
  background   : #ffffff;
  border-radius: 10px;
  }
.app-footer {
  background-color:#dee0e0;
  height: 53px;
  width: 100;
}
el-header {
  padding: 0;
}
</style>