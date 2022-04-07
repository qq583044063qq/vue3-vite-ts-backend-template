<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted, nextTick, watch } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
const store = useStore(key)
interface LineChartProps {
  chartData: ILineChartData,
  className?: string,
  width?: string,
  height?: string
}

const props = withDefaults(defineProps<LineChartProps>(), {
  className: 'chart',
  width: '100%',
  height: '300px'
})
let lineChartRef = ref<HTMLElement>()
let mychart: any
const initChart = () => {
  mychart = echarts.init(lineChartRef.value as HTMLElement, 'macarons')
  setOptions(props.chartData)
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
const setOptions = (chartData: ILineChartData) => {
  if (mychart) {
    mychart.setOption({
      xAxis: {
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        boundaryGap: false,
        axisTick: {
          show: false
        }
      },
      grid: {
        left: 10,
        right: 10,
        bottom: 20,
        top: 30,
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        padding: 8
      },
      yAxis: {
        axisTick: {
          show: false
        }
      },
      legend: {
        data: ['expected', 'actual']
      },
      series: [{
        name: 'expected',
        itemStyle: {
          color: '#FF005A',
          lineStyle: {
            color: '#FF005A',
            width: 2
          }
        },
        smooth: true,
        type: 'line',
        data: chartData.expectedData,
        animationDuration: 2800,
        animationEasing: 'cubicInOut'
      },
      {
        name: 'actual',
        smooth: true,
        type: 'line',
        itemStyle: {
          color: '#3888fa',
          lineStyle: {
            color: '#3888fa',
            width: 2
          },
          areaStyle: {
            color: '#f3f8ff'
          }
        },
        data: chartData.actualData,
        animationDuration: 2800,
        animationEasing: 'quadraticOut'
      }]
    })
  }
}
</script>
<script lang ="ts">
export interface ILineChartData {
  expectedData: number[]
  actualData: number[]
}
</script>
<template>
  <div
    ref="lineChartRef"
    :class="props.className"
    :style="{width: props.width, height: props.height}"
  ></div>
</template>