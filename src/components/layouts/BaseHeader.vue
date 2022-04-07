<script setup lang="ts">
import { ref } from 'vue'
import { Setting, User, Expand, Fold, InfoFilled } from '@element-plus/icons-vue'
import { key } from '../../store'
import { useStore } from 'vuex'
const store = useStore(key)
interface Props {
    baseSideIsCollapse: boolean
}
//设置属性
const props = withDefaults(defineProps<Props>(),{
  baseSideIsCollapse: false
});
// 设定事件
const emit = defineEmits<{
  (e: 'sideExpandChange'):void,
  (e: 'userLogout'):void
}>();
// 设定事件触发处理函数
const sideExpandButtonClick = () => {
  emit("sideExpandChange");
}
const userLogoutBtnClick = () => {
  emit("userLogout");
}
</script>
<template>
  <div class="header-container">
    <div class="hamburger-container" @click="sideExpandButtonClick">
      <el-icon class="hamburger"><expand :class="{ hamburgerIsActive: !props.baseSideIsCollapse }"/></el-icon >
    </div>
    <div class="toolbar">
      <el-dropdown>
        <!-- <el-icon style="margin-right: 8px; margin-top: 1px">
          <User />
        </el-icon> -->
        <el-avatar :size="35" :src="store.getters.userAvatar" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click="userLogoutBtnClick">登出</el-dropdown-item >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <span class="userName">&nbsp; {{store.getters.userName}}</span >
    </div>
  </div>
</template>
<style scoped lang="scss">
.header-container {
  position: relative;
  height: 100%;
  border-bottom: 1px solid #E6DFDC;
  z-index: 1;
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    padding: 0 15px;
    transition: background, .3s;
    .hamburger {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
    .hamburgerIsActive {
      transform: rotate(180deg);
    }
  }
  .hamburger-container:hover {
    background: rgba(0,0,0,0.025);
  }
  .toolbar {
    position: absolute;
    display: inline-flex;
    align-items: center;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    .userName {
      font-size: 20px;
      color: #409EFF;
    }
  }
}
</style>
