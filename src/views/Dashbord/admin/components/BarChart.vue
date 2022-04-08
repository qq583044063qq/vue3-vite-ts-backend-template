<script setup lang="ts">
import * as echarts from 'echarts'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
const store = useStore(key)
interface BarChartProps {
  className?:string,
  width?: string,
  height?: string
}
const props =withDefaults(defineProps<BarChartProps>(),{
  className : 'chart',
  width: '100%',
  height: '300px'
})
const animationDuration = 6000
let barChartRef= ref<HTMLElement>()
let mychart:any
const initChart = ()=> {
  mychart = echarts.init(barChartRef.value as HTMLElement, 'macarons')
  mychart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: 10,
        left: '2%',
        right: '2%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        axisTick: {
          alignWithLabel: true
        }
      }],
      yAxis: [{
        type: 'value',
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: 'pageA',
        type: 'bar',
        stack: 'vistors',
        // barWidth: '60%',
        data: [79, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageB',
        type: 'bar',
        stack: 'vistors',
        // barWidth: '60%',
        data: [80, 52, 200, 334, 390, 330, 220],
        animationDuration
      }, {
        name: 'pageC',
        type: 'bar',
        stack: 'vistors',
        // barWidth: '60%',
        data: [30, 52, 200, 334, 390, 330, 220],
        animationDuration
      }]
    })
}
let chartIsResizing = false
onMounted(() => {
  nextTick(() => {
    initChart()
  })

  window.addEventListener('resize', () => {
    if (mychart) {
      if (!chartIsResizing) {
        chartIsResizing = true
        setTimeout(() => {
          mychart.resize({
            animation: {
              duration: 500
            }
          })
          chartIsResizing = false
        }, 200)
      }
    }
  })
})
watch(() => store.getters.sideBarIsCollapse, (current, prev) => {
  if (mychart) {
    setTimeout(() => {
      mychart.resize({
        animation: {
          duration: 500
        }
      })
    }, 200)

  }
})
onBeforeUnmount(()=> {
  if(mychart) {
    mychart.dispose()
    mychart = null
  }
})
</script>
<template>
  <div ref="barChartRef" :class="props.className" :style="{width: props.width, height: props.height}">

  </div>
</template>