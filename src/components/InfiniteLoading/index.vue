<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import loadingImage from '@/assets/images_load.gif'
import noneImage from '@/assets/images_none.png'
interface prop {
  loading: boolean,
  finished: boolean
}
const props = defineProps<prop>()
const emit = defineEmits<{
  (e:'infinite'):void
}>()
const container = ref(null)
useIntersectionObserver(container,([{ isIntersecting  }], dom)=> {
  if(isIntersecting) {
    // 当loading和finished的值都为false时，就通知父组件调用方法继续向后台请求数据
    if (props.loading === false && props.finished === false) {
      emit('infinite')
    }
  }
},
{ threshold: 0 }
)
</script>
<template>
  <div class="infinite-loading" ref="container">
    <div class="loading" v-if="props.loading">
      <span class="icon"><img :src="loadingImage"/></span>
      <span class="text">正在加载中...</span>
    </div>
    <div class="none" v-if="props.finished">
      <span class="icon"><img :src="noneImage"/></span>
      <span class="text">没有更多了</span>
    </div>
  </div>
</template>
<style scoped lang="scss">
.infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .icon {
      width: 50px;
      height: 50px;
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
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    .icon {
      width: 50px;
      height: 40px;
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