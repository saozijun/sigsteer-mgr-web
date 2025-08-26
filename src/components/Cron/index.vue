<template>
    <div class="cron-selector">
        <el-tabs type="border-card">
            <el-tab-pane label="秒">
                <el-radio-group v-model="secondRadio">
                    <el-radio value="1" size="large">每秒 允许的通配符[,-*/]</el-radio>
                    <el-radio value="2" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="secondStart1" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到</span>
                                <el-input v-model="secondEnd1" style="width: 60px;margin-right: 8px;" />
                                <span>秒</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="secondStart2" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">秒开始，每</span>
                                <el-input v-model="secondEnd2" style="width: 60px;margin-right: 8px;" />
                                <span>秒执行一次</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="4" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">指定</span>
                                <el-checkbox-group v-model="checkSeconds">
                                    <el-checkbox v-for="item in secondList" :label="item" :value="item" />
                                </el-checkbox-group>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
            <el-tab-pane label="分钟">
                <el-radio-group v-model="minutesRadio">
                    <el-radio value="1" size="large">每分钟 允许的通配符[,-*/]</el-radio>
                    <el-radio value="2" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="minutesStart1" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到</span>
                                <el-input v-model="minutesEnd1" style="width: 60px;margin-right: 8px;" />
                                <span>分钟</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="minutesStart2" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">分钟开始，每</span>
                                <el-input v-model="minutesEnd2" style="width: 60px;margin-right: 8px;" />
                                <span>分钟执行一次</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="4" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">指定</span>
                                <el-checkbox-group v-model="checkMinutes">
                                    <el-checkbox v-for="item in secondList" :label="item" :value="item" />
                                </el-checkbox-group>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
            <el-tab-pane label="小时">
                <el-radio-group v-model="hourRadio">
                    <el-radio value="1" size="large">每小时 允许的通配符[,-*/]</el-radio>
                    <el-radio value="2" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="hourStart1" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到</span>
                                <el-input v-model="hourEnd1" style="width: 60px;margin-right: 8px;" />
                                <span>小时</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="hourStart2" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">小时开始，每</span>
                                <el-input v-model="hourEnd2" style="width: 60px;margin-right: 8px;" />
                                <span>小时执行一次</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="4" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">指定</span>
                                <el-checkbox-group v-model="checkHour">
                                    <el-checkbox v-for="item in hourList" :label="item" :value="item" />
                                </el-checkbox-group>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
            <el-tab-pane label="日">
                <el-radio-group v-model="dayRadio">
                    <el-radio value="1" size="large">每日 允许的通配符[,-*/]</el-radio>
                    <el-radio value="2" size="large">不指定</el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="dayStart1" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到</span>
                                <el-input v-model="dayEnd1" style="width: 60px;margin-right: 8px;" />
                                <span>日</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="4" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="dayStart2" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">日开始，每</span>
                                <el-input v-model="dayEnd2" style="width: 60px;margin-right: 8px;" />
                                <span>日执行一次</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="5" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">每月</span>
                                <el-input v-model="day" style="width: 60px;margin-right: 8px;" />
                                <span>号最近的那个工作日</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="6" size="large">本月最后一天</el-radio>
                    <el-radio value="7" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">指定</span>
                                <el-checkbox-group v-model="checkDay">
                                    <el-checkbox v-for="item in dayList" :label="item" :value="item" />
                                </el-checkbox-group>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
            <el-tab-pane label="月">
                <el-radio-group v-model="monthRadio">
                    <el-radio value="1" size="large">每月 允许的通配符[,-*/]</el-radio>
                    <el-radio value="2" size="large">不指定</el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="monthStart1" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到</span>
                                <el-input v-model="monthEnd1" style="width: 60px;margin-right: 8px;" />
                                <span>月</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="4" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="monthStart2" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">月开始，每</span>
                                <el-input v-model="monthEnd2" style="width: 60px;margin-right: 8px;" />
                                <span>月执行一次</span>
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="5" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">指定</span>
                                <el-checkbox-group v-model="selectedMonth">
                                    <el-checkbox v-for="item in dayList" :label="item" :value="item" />
                                </el-checkbox-group>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
            <el-tab-pane label="周">
                <el-radio-group v-model="weekRadio">
                    <el-radio value="1" size="large">每周 允许的通配符[,-*/]</el-radio>
                    <el-radio value="2" size="large">不指定</el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从星期</span>
                                <el-input v-model="weekStart1" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到星期</span>
                                <el-input v-model="weekEnd1" style="width: 60px;margin-right: 8px;" />
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="4" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">第</span>
                                <el-input v-model="weekStart2" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">周的星期</span>
                                <el-input v-model="weekEnd2" style="width: 60px;margin-right: 8px;" />
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="5" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">本月最后一个星期</span>
                                <el-input v-model="week" style="width: 60px;margin-right: 8px;" />
                            </div>
                        </template>
                    </el-radio>
                    <el-radio value="6" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">指定</span>
                                <el-checkbox-group v-model="selectedWeek">
                                    <el-checkbox v-for="item in weekList" :label="item" :value="item"
                                        style="margin-bottom: 0;" />
                                </el-checkbox-group>
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
            <el-tab-pane label="年">
                <el-radio-group v-model="yearRadio">
                    <el-radio value="1" size="large">不指定 允许的通配符[, - * /]</el-radio>
                    <el-radio value="2" size="large">每年</el-radio>
                    <el-radio value="3" size="large">
                        <template #default>
                            <div style="display: flex;align-items: center;">
                                <span style="margin-right: 8px;">周期从</span>
                                <el-input v-model="yearStart" style="width: 60px;margin-right: 8px;" />
                                <span style="margin-right: 8px;">到</span>
                                <el-input v-model="yearEnd" style="width: 60px;margin-right: 8px;" />
                            </div>
                        </template>
                    </el-radio>
                </el-radio-group>
                <expression v-model:fieldVal="fieldVal" v-model:cron="cron" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { reactive, ref, watch, watchEffect } from 'vue'
import expression from './expression.vue'
const ruleFormRef = ref()
const ruleForm = ref({})

const pad = n => n.toString().padStart(2, '0');
const secondList = new Array(60).fill(0).map((_, index) => {
    return pad(index)
})
const hourList = new Array(24).fill(0).map((_, index) => {
    return pad(index)
})
const weekList = new Array(7).fill(0).map((_, index) => {
    return pad(index + 1)
})
const dayList = new Array(31).fill(0).map((_, index) => {
    return pad(index)
})
const month = new Array(12).fill(0).map((_, index) => {
    return pad(index + 1)
})

// 秒选框
const secondRadio = ref('')
const secondStart1 = ref(1)
const secondEnd1 = ref(2)
const secondStart2 = ref(0)
const secondEnd2 = ref(1)
// 分钟选框
const minutesRadio = ref('')
const minutesStart1 = ref(1)
const minutesEnd1 = ref(2)
const minutesStart2 = ref(0)
const minutesEnd2 = ref(1)
// 小时选框
const hourRadio = ref('')
const hourStart1 = ref(1)
const hourEnd1 = ref(2)
const hourStart2 = ref(0)
const hourEnd2 = ref(1)
// 日选框
const dayRadio = ref('')
const dayStart1 = ref(1)
const dayEnd1 = ref(2)
const dayStart2 = ref(1)
const dayEnd2 = ref(1)
const day = ref(1)
// 月选框
const monthRadio = ref('')
const monthStart1 = ref(1)
const monthEnd1 = ref(2)
const monthStart2 = ref(1)
const monthEnd2 = ref(1)
// 周选框
const weekRadio = ref('')
const weekStart1 = ref(1)
const weekEnd1 = ref(2)
const weekStart2 = ref(1)
const weekEnd2 = ref(1)
const week = ref('')
// 年
const yearRadio = ref('')
const yearStart = ref('')
const yearEnd = ref('')

const checkSeconds = ref([])
const checkMinutes = ref([])
const checkHour = ref([])
const checkDay = ref([])
const selectedMonth = ref([])
const selectedWeek = ref([])

const fieldVal = ref({
    second: '*',
    minutes: '*',
    hour: '*',
    day: '*',
    month: '*',
    week: '?',
    year: '',
})

watchEffect(() => {
    // 秒
    if (secondRadio.value == '1') {
        fieldVal.value.second = '*'
    } else if (secondRadio.value == '2') {
        fieldVal.value.second = `${secondStart1.value}-${secondEnd1.value}`
    } else if (secondRadio.value == '3') {
        fieldVal.value.second = `${secondStart2.value}/${secondEnd2.value}`
    } else if (secondRadio.value == '4') {
        const list = checkSeconds.value.map(v => parseInt(v))
        list.sort((a, b) => a - b)
        fieldVal.value.second = list.join(',')
    }
    // 分
    if (minutesRadio.value == '1') {
        fieldVal.value.minutes = '*'
    } else if (minutesRadio.value == '2') {
        fieldVal.value.minutes = `${minutesStart1.value}-${minutesEnd1.value}`
    } else if (minutesRadio.value == '3') {
        fieldVal.value.minutes = `${minutesStart2.value}/${minutesEnd2.value}`
    } else if (minutesRadio.value == '4') {
        const list = checkMinutes.value.map(v => parseInt(v))
        list.sort((a, b) => a - b)
        fieldVal.value.minutes = list.join(',')
    }
    // 时
    if (hourRadio.value == '1') {
        fieldVal.value.hour = '*'
    } else if (hourRadio.value == '2') {
        fieldVal.value.hour = `${hourStart1.value}-${hourEnd1.value}`
    } else if (hourRadio.value == '3') {
        fieldVal.value.hour = `${hourStart2.value}/${hourEnd2.value}`
    } else if (hourRadio.value == '4') {
        const list = checkHour.value.map(v => parseInt(v))
        list.sort((a, b) => a - b)
        fieldVal.value.hour = list.join(',')
    }
    // 日
    switch (dayRadio.value) {
        case '1':
            fieldVal.value.day = '*'
            break
        case '2':
            fieldVal.value.day = '?'
            break
        case '3':
            fieldVal.value.day = `${dayStart1.value}-${dayEnd1.value}`
            break
        case '4':
            fieldVal.value.day = `${dayStart2.value}/${dayEnd2.value}`
            break
        case '5':
            fieldVal.value.day = `${day.value}W`
            break
        case '6':
            fieldVal.value.day = `L`
            break
        case '7':
            const list = checkDay.value.map(v => parseInt(v))
            list.sort((a, b) => a - b)
            fieldVal.value.day = list.join(',')
            break
    }
    // 月
    switch (monthRadio.value) {
        case '1':
            fieldVal.value.month = '*'
            break
        case '2':
            fieldVal.value.month = '?'
            break
        case '3':
            fieldVal.value.month = `${monthStart1.value}-${monthEnd1.value}`
            break
        case '4':
            fieldVal.value.month = `${monthStart2.value}/${monthEnd2.value}`
            break
        case '5':
            const list = selectedMonth.value.map(v => parseInt(v))
            list.sort((a, b) => a - b)
            fieldVal.value.month = list.join(',')
            break
    }
    // 周
    switch (weekRadio.value) {
        case '1':
            fieldVal.value.week = '*'
            break
        case '2':
            fieldVal.value.week = '?'
            break
        case '3':
            fieldVal.value.week = `${weekStart1.value}-${weekEnd1.value}`
            break
        case '4':
            fieldVal.value.week = `${weekStart2.value}/${weekEnd2.value}`
            break
        case '5':
            fieldVal.value.week = `${week.value}L`
            break
        case '6':
            const list = selectedWeek.value.map(v => parseInt(v))
            list.sort((a, b) => a - b)
            fieldVal.value.week = list.join(',')
            break
    }
    switch (yearRadio.value) {
        case '1':
            fieldVal.value.year = ''
            break
        case '2':
            fieldVal.value.year = '*'
            break
        case '3':
            fieldVal.value.year = `${yearStart.value}-${yearEnd.value}`
            break
    }
})

const cron = ref('')
watch(() => fieldVal.value, (newVal) => {
    const { second, minutes, hour, day, month, week, year } = newVal
    cron.value = `${second} ${minutes} ${hour} ${day} ${month} ${week} ${year}`
}, { immediate: true, deep: true })
</script>

<style lang="scss" scoped>
.cron-selector {
    width: vw(800);
    margin: 0 auto;
    padding: vw(20);
    font-size: vw(14);
    ::v-deep(.el-tabs__content) {
        padding: vw(10);
    }

    ::v-deep(.el-radio-group) {
        .el-radio {
            width: 100%;
            height: auto;
            margin-bottom: vw(12);
            min-height: vw(36);
        }
    }

    ::v-deep(.el-checkbox-group) {
        display: flex;
        flex-wrap: wrap;

        .el-checkbox {
            margin-right: 10px;
            height: auto;
            margin-bottom: 10px;
        }
    }
}
</style>
