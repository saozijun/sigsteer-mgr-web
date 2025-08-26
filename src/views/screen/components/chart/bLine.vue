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
import dayjs from 'dayjs'

const props = defineProps({
    unit: {
        type: String,
        default: "辆"
    }
})

const option = ref({})
const baseFontSize = ref(13)
const data = ref([{
    date: "",
    alarmTrains: 0
}])
const init = (initData) => {
    const dateList = initData.map((item) => dayjs(item.date).format('MM-DD'));
    const valueList = initData.map((item) => item.alarmTrains);

    option.value = {
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
              <p>${params[0].value} ${props.unit}</p>
            </div>`;
            },
            textStyle: {
                fontSize: computeFontSize(baseFontSize.value)
            }
        },
        grid: {
            left: '2%',
            right: '6%',
            bottom: '0%',
            top: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#052941'
                }
            },
            data: dateList,
            axisLabel: {
                color: '#fff',
                fontSize: computeFontSize(baseFontSize.value),
                interval: function (index, value) {
                    const showEvery = Math.ceil(dateList.length / 10);
                    return index % showEvery === 0;
                }
            }
        },
        yAxis: {
            type: 'value',
            minInterval: 1,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#052941'
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: computeFontSize(baseFontSize.value),
                interval: 0,
            }
        },
        series: [
            {
                type: 'line',
                data: valueList,
                showSymbol: true,
                symbol: 'circle',
                symbolSize: computeFontSize(8),
                lineStyle: {
                    width: 2,
                    color: '#a8b447'
                },
                itemStyle: {
                    color: '#40ffd5',
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
