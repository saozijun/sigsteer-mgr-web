<template>
    <div class="expression">
        <div class="ex-title">{{ exTitle }}</div>
        <div class="ex-fields" style="margin-top: 4px;">
            <div class="label">表达式字段</div>
            <ul>
                <li v-for="field in fields" :key="field.label">
                    <div>{{ field.label }}</div>
                    <div>{{ fieldVal[field.key] }}</div>
                </li>
            </ul>
        </div>
        <div class="ex-fields" style="margin-top: 10px;">
            <div class="label">Cron表达式</div>
            <el-input v-model="cron" />
            <!-- <el-button type="primary">反解析</el-button> -->
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const exTitle = '</>表达式'

const fields = ref([
    {
        label: '秒',
        key: 'second'
    },
    {
        label: '分钟',
        key: 'minutes'
    },
    {
        label: '小时',
        key: 'hour'
    },
    {
        label: '日',
        key: 'day'
    },
    {
        label: '月',
        key: 'month'
    },
    {
        label: '星期',
        key: 'week'
    },
    {
        label: '年',
        key: 'year'
    }
])
const fieldVal = defineModel('fieldVal')
const cron = defineModel('cron')
</script>

<style lang="scss" scoped>
.expression {
    border: vw(1) solid #c8e9ff3f;
    margin-top: vw(10);
    padding: vw(12) vw(10);
    position: relative;

    .ex-title {
        font-size: vw(14);
        position: absolute;
        font-weight: 300;
        background-color: #010a20;
        padding: vw(8) vw(10);
        top: vw(-16);
        left: vw(10);
        color: #fff;
        border-radius: vw(50);
    }

    .ex-fields {
        display: flex;
        align-items: center;

        ul {
            display: flex;
            flex: 1;
            justify-content: space-between;
            gap: vw(10);
            li {
                flex: 1;
                display: flex;
                flex-direction: column;
                font-size: vw(13);
                &>div:first-child {
                    background-color: #1e9effb2;
                    color: #FFF;
                    text-align: center;
                    padding: vw(6);
                }

                &>div:last-child {
                    color: #1E9FFF;
                    background-color: #3099df34;
                    text-align: center;
                    padding: vw(8);
                    min-height: vw(30);
                    line-height: 1;
                }
            }

            li:last-child {
                margin-right: 0;
            }
        }
    }

    .label {
        width: vw(80);
        flex-shrink: 0;
        font-size: vw(14);
        margin-right: vw(10);
        color: #fff;
    }
}
</style>
