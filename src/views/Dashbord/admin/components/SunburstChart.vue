<script setup lang="ts">
import * as echarts from 'echarts'
import { nextTick, onMounted, ref, watch, onBeforeUnmount } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'
const store = useStore(key)
interface prop {
  className?: string,
  width?: string,
  height?: string
}
const props = withDefaults(defineProps<prop>(), {
  className: 'chart',
  width: '100%',
  height: '300px'
})
const animationDuration = 3000
let radarChartRef = ref<HTMLElement>()
let mychart: any
const item1 = {
  color: '#F54F4A'
};
const item2 = {
  color: '#FF8C75'
};
const item3 = {
  color: '#FFB499'
};
const data = [
  {
    children: [
      {
        value: 5,
        children: [
          {
            value: 1,
            itemStyle: item1
          },
          {
            value: 2,
            children: [
              {
                value: 1,
                itemStyle: item2
              }
            ]
          },
          {
            children: [
              {
                value: 1
              }
            ]
          }
        ],
        itemStyle: item1
      },
      {
        value: 10,
        children: [
          {
            value: 6,
            children: [
              {
                value: 1,
                itemStyle: item1
              },
              {
                value: 1
              },
              {
                value: 1,
                itemStyle: item2
              },
              {
                value: 1
              }
            ],
            itemStyle: item3
          },
          {
            value: 2,
            children: [
              {
                value: 1
              }
            ],
            itemStyle: item3
          },
          {
            children: [
              {
                value: 1,
                itemStyle: item2
              }
            ]
          }
        ],
        itemStyle: item1
      }
    ],
    itemStyle: item1
  },
  {
    value: 9,
    children: [
      {
        value: 4,
        children: [
          {
            value: 2,
            itemStyle: item2
          },
          {
            children: [
              {
                value: 1,
                itemStyle: item1
              }
            ]
          }
        ],
        itemStyle: item1
      },
      {
        children: [
          {
            value: 3,
            children: [
              {
                value: 1
              },
              {
                value: 1,
                itemStyle: item2
              }
            ]
          }
        ],
        itemStyle: item3
      }
    ],
    itemStyle: item2
  },
  {
    value: 7,
    children: [
      {
        children: [
          {
            value: 1,
            itemStyle: item3
          },
          {
            value: 3,
            children: [
              {
                value: 1,
                itemStyle: item2
              },
              {
                value: 1
              }
            ],
            itemStyle: item2
          },
          {
            value: 2,
            children: [
              {
                value: 1
              },
              {
                value: 1,
                itemStyle: item1
              }
            ],
            itemStyle: item1
          }
        ],
        itemStyle: item3
      }
    ],
    itemStyle: item1
  },
  {
    children: [
      {
        value: 6,
        children: [
          {
            value: 1,
            itemStyle: item2
          },
          {
            value: 2,
            children: [
              {
                value: 2,
                itemStyle: item2
              }
            ],
            itemStyle: item1
          },
          {
            value: 1,
            itemStyle: item3
          }
        ],
        itemStyle: item3
      },
      {
        value: 3,
        children: [
          {
            value: 1
          },
          {
            children: [
              {
                value: 1,
                itemStyle: item2
              }
            ]
          },
          {
            value: 1
          }
        ],
        itemStyle: item3
      }
    ],
    itemStyle: item1
  }
]
const initChart = () => {
  mychart = echarts.init(radarChartRef.value as HTMLElement, 'macarons')
  mychart.setOption({
    series: {
      radius: ['15%', '80%'],
      type: 'sunburst',
      sort: undefined,
      emphasis: {
        focus: 'ancestor'
      },
      data: data,
      label: {
        rotate: 'radial'
      },
      levels: [],
      itemStyle: {
        color: '#ddd',
        borderWidth: 2
      }
    }
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
  <div
    ref="radarChartRef"
    :class="props.className"
    :style="{width: props.width, height: props.height}"
  ></div>
</template>