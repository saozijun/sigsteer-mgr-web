<template>
    <div class="hbar-chart">
        <Echart :options="option" height="100%" width="100%" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { Echart } from '@/components/Echart'
import * as echarts from 'echarts'
import { computeFontSize } from '@/utils'
import dayjs from 'dayjs'
// 日期作为横坐标
const option = ref({})

const init = (initData = []) => {
    const dateList = initData.map((item) => dayjs(item.date).format('MM-DD'));
    const valueList = initData.map((item) => item.bizRate);

    option.value = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
                label: {
                    show: false
                }
            },
            backgroundColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0,0,0,0)',
            className: 'tooltip-box',
            formatter: function (params) {
                const htmlText = `<div class='tooltip-style'>
            <div>${params[0].name}</div>
            <p>数量：${params[0].value}%</p>
            </div>`
                return htmlText
            }
        },
        xAxis: {
            type: 'category',
            data: dateList,
            axisLabel: {
                color: '#fff',
                fontSize: computeFontSize(12),
                rotate: 0,
                margin: 5,
            },
            axisTick: { show: false },
            axisLine: {
                lineStyle: { color: '#666' }
            }
        },
        yAxis: {
            axisLine: { show: false },
            axisTick: { show: false },
            minInterval: 1,
            axisLabel: {
                color: '#fff',
                fontSize: computeFontSize(12),
                formatter: (value) => value.toFixed(0) + '%'
            },
            splitLine: {
                show: false
            }
        },
        grid: {
            left: '8%',
            right: '2%',
            bottom: '15%',
            top: '5%'
        },
        dataZoom: [
            {
                type: 'inside'
            }
        ],
        series: [
            {
                type: 'bar',
                // showBackground: true,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ])
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ])
                    }
                },
                data:valueList
            }
        ]
    }
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
.hbar-chart {
    width: 100%;
    height: 100%;
}
</style>
