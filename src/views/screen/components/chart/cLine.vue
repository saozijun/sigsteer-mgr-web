<template>
    <div class="chart">
        <Echart :options="option" height="100%" width="100%" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Echart } from '@/components/Echart'
import { computeFontSize } from '@/utils'

const option = ref({})
const baseFontSize = ref(14)
const init = (initData = []) => {
    option.value = {
        color: ['#4c7cff98', '#00b05098', '#ffc00098'],
        title: {
            text: 'CBTC平均时间间隔（秒）',
            top: '0%',
            left: '1%',
            textStyle: {
                color: '#ddd',
                fontSize: computeFontSize(baseFontSize.value)
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985',
                    fontSize: computeFontSize(baseFontSize.value)
                }
            },
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            className: 'tooltip-box',
            formatter: (params) => {
                return `<div class='tooltip-style'>
              <div>${params[0].name}</div>
              <p>${params[0].value} 秒</p>
            </div>`;
            },
            textStyle: {
                fontSize: computeFontSize(baseFontSize.value)
            }
        },
        grid: {
            left: '2%',
            right: '3%',
            bottom: '0%',
            top: '20%',
            containLabel: true
        },
        legend: {
            data: ['CI', 'ZC', 'ATS'],
            top: '0%',
            textAlign: 'center',
            textStyle: {
                color: '#ddd',
                fontSize: computeFontSize(baseFontSize.value - 2)
            }
        },
        xAxis: [
            {
                type: 'category',
                axisLabel: {
                    color: '#fff',
                    fontSize: computeFontSize(baseFontSize.value - 1),
                    interval: 0,
                },
                axisTick: {
                    show: false
                },
                boundaryGap: false,
                data: initData.date
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: '#052941'
                    }
                },
                axisLabel: {
                    color: '#fff',
                    fontSize: computeFontSize(baseFontSize.value - 1),
                    interval: 0,
                }
            }
        ],
        series: [
            {
                name: 'CI',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: initData.CI
            },
            {
                name: 'ZC',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: initData.ZC
            },
            {
                name: 'ATS',
                type: 'line',
                stack: 'Total',
                areaStyle: {},
                emphasis: {
                    focus: 'series'
                },
                data: initData.ATS
            }
        ]
    };
}
onMounted(() => {
    init()
    window.addEventListener('resize', init)
})

onUnmounted(() => {
    window.removeEventListener('resize', init)
})
defineExpose({
    init
})
</script>

<style scoped lang="scss">
.chart {
    width: 100%;
    height: 100%;
}
</style>
