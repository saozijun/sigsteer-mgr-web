<template>
    <div class="chart">
        <Echart :options="option" height="100%" width="100%" />
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import { Echart } from '@/components/Echart'
import { computeFontSize } from '@/utils'

const option = ref({})
const baseFontSize = ref(13)
const data = ref([])
const init = (initData) => {
    const dateList = initData.map((item) => item.name);
    const valueList = initData.map((item) => item.value);

    option.value = {
        title: {
            text: '切换率（次）',
            top: '0%',
            left: '1.5%',
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
              <div>时间：${params[0].name}</div>
              <p>${params[0].value}</p>
            </div>`;
            },
            textStyle: {
                fontSize: computeFontSize(baseFontSize.value)
            }
        },
        grid: {
            left: '2%',
            right: '4%',
            bottom: '10%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            name: '时间',
            nameLocation: 'middle',
            nameGap: computeFontSize(30),
            nameTextStyle: {
                fontSize: computeFontSize(12),
                color: '#ddd',
            },
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#ffffff80'
                }
            },
            data: dateList,
            axisLabel: {
                color: '#fff',
                fontSize: computeFontSize(baseFontSize.value),
                interval: 3
            }
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#24e0ee80'
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: computeFontSize(baseFontSize.value),
            }
        },
        series: [
            {
                type: 'line',
                data: valueList,
                showSymbol: true,
                symbol: 'circle',
                symbolSize: computeFontSize(4),
                lineStyle: {
                    width: 2,
                    color: '#40ffd5'
                },
                itemStyle: {
                    color: '#40ffd4',
                },
                areaStyle: {
                    opacity: 1,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: '#20bcb680'
                        },
                        {
                            offset: 1,
                            color: '#20bcb600'
                        }
                    ])
                }
            }
        ]
    };
}
onMounted(() => {
    for (let i = 0; i <= 24; i++) {
        data.value.push({
            name: `${i}:00`,
            value: Math.floor(Math.random() * 10)
        })
    }
    init(data.value)
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
