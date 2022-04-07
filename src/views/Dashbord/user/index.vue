<script setup lang="ts">
import { reactive, ref } from 'vue';
import ApplicationSetting from '@/setting'
import LineChart, {ILineChartData} from './components/LineChart.vue'
import GithubCorner from '@/components/GithubCorner/index.vue'
import SunburstChart from './components/SunburstChart.vue'
import BoxCard from './components/BoxCard.vue'
import PanelGroup from './components/PanelGroup.vue'
import PieChart from './components/PieChart.vue'
import BarChart from './components/BarChart.vue'
let LineChartData = ref<{ [type: string]: ILineChartData }>({
  newVisitis: {
  expectedData:[100, 120, 161, 134, 105, 160, 165],
  actualData: [120, 82, 91, 154, 162, 140, 145]
},
  messages: {
  expectedData: [200, 192, 120, 144, 160, 130, 140],
  actualData: [180, 160, 151, 106, 145, 150, 130]
},
  purchases: {
  expectedData: [80, 100, 121, 104, 105, 90, 100],
  actualData: [120, 90, 100, 138, 142, 130, 130]
},
  shoppings: {
  expectedData: [130, 140, 141, 142, 145, 150, 160],
  actualData: [120, 82, 91, 154, 162, 140, 130]
}
})
let currentLineChartData = ref(LineChartData.value.newVisitis)
const handleSetLineChartData = (type:string) => {
  currentLineChartData.value =LineChartData.value[type]
  console.log(currentLineChartData)
}

</script>
<template>
  <div class="dashboard-user-container">
    <GithubCorner></GithubCorner>
    <PanelGroup  @handleSetLineChartDataEvent="handleSetLineChartData"/>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <LineChart :key="currentLineChartData" :chartData="currentLineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
        <SunburstChart />
         <!-- <div>radar-chart</div> -->
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
           <PieChart />
        </div>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :lg="8"
      >
        <div class="chart-wrapper">
          <BarChart />
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col
        :xs="{span: 24}"
        :sm="{span: 24}"
        :md="{span: 24}"
        :lg="{span: 12}"
        :xl="{span: 12}"
        style="padding-right:8px;margin-bottom:30px;"
      >
        <div>其他面板</div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
       <div>其他面板</div>
      </el-col>
      <el-col
        :xs="{span: 24}"
        :sm="{span: 12}"
        :md="{span: 12}"
        :lg="{span: 6}"
        :xl="{span: 6}"
        style="margin-bottom:30px;"
      >
        <BoxCard />
      </el-col>
    </el-row>
  </div >
</template>
<style lang="scss" scoped>
.dashboard-user-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>