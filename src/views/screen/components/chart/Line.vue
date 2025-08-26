<template>
  <div class="line-chart">
    <Echart :options="option" height="100%" width="100%" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { Echart } from '@/components/Echart'
import { computeFontSize } from '@/utils'
const option = ref({})

const generateOption = () => {
  option.value = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      backgroundColor: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0)',
      className: 'tooltip-box',
      formatter: function (params) {
        const htmlText = `<div class='tooltip-style'>
            <div>${params[0].name}</div>
            <p>${params[0].seriesName}：${params[0].value}</p>
            <p>${params[1].seriesName}：${params[1].value}</p>
            </div>`
        return htmlText
      }
    },
    color: ['#0ce48a', '#ffd200'],
    legend: {
      data: ['CI', 'ZC', 'ATS'],
      left: '0%',
      top: '0%',
      icon: 'rect',
      itemWidth: computeFontSize(12),
      itemHeight: computeFontSize(12),
      textStyle: {
        color: '#fff',
        fontSize: computeFontSize(14),
      }
    },
    grid: {
      left: '0%',
      right: '5%',
      bottom: '20%',
      top: '20%',
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
        // axisTick: {
        //   show: false // 不显示坐标轴刻度线
        // },
        // axisLine: {
        //   show: false // 不显示坐标轴线
        // },
        axisLabel: {
          color: '#fff',
          fontSize: computeFontSize(12),
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        name: 'CI',
        type: 'line',
        areaStyle: { //区域填充样式
          normal: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#4c7cff'
              },
              {
                offset: 1,
                color: '#4c7cff01'
              }
            ])
          }
        },
        showSymbol: false,
        emphasis: {
          focus: 'series'
        },
        smooth: true,
        data: [220, 132, 281, 134, 400, 230, 210, 1000, 150]
      },
      {
        name: 'ZC',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          normal: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#00b050'
              },
              {
                offset: 1,
                color: '#00b05001'
              }
            ])
          }
        },
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [220, 400, 891, 700, 500, 330, 310, 220, 250]
      },
      {
        name: 'ATS',
        type: 'line',
        showSymbol: false,
        areaStyle: {
          normal: {
            opacity: 1,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#ffd200'
              },
              {
                offset: 1,
                color: '#ffd20001'
              }
            ])
          }
        },
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [800, 400, 891, 700, 500, 330, 310, 220, 250]
      }
    ]
  }
}
onMounted(() => {
  generateOption()
  window.addEventListener('resize', generateOption)
})

onUnmounted(() => {
  window.removeEventListener('resize', generateOption)
})
</script>

<style scoped lang="scss">
.line-chart {
  width: 100%;
  height: 100%;
}
</style>
