<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, nextTick,watch,onBeforeUnmount } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
const store = useStore(key)
interface prop {
  className?:string,
  width?:string,
  height?:string
}
const props = withDefaults(defineProps<prop>(), {
  className: 'chart',
  width: '100%',
  height: '300px'
})
let pieChartRef = ref<HTMLElement>()
let mychart:any
const animationDuration = 2600
const initChart = () => {
   mychart = echarts.init(pieChartRef.value as HTMLElement, 'macarons')
   mychart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        left: 'center',
        bottom: '10',
        data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
      },
      series: [
        {
          name: 'WEEKLY WRITE ARTICLES',
          type: 'pie',
          roseType: 'radius',
          radius: [15, 95],
          center: ['50%', '38%'],
          data: [
            { value: 320, name: 'Industries' },
            { value: 240, name: 'Technology' },
            { value: 149, name: 'Forex' },
            { value: 100, name: 'Gold' },
            { value: 59, name: 'Forecasts' }
          ],
          animationEasing: 'cubicInOut',
          animationDuration: animationDuration
        }
      ]
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
  <div ref="pieChartRef" :class="props.className" :style="{width: props.width, height: props.height}">

  </div>
</template>