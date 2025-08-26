<template>
    <div class="backend-main">
        <h3 class="title">业务周期轮询配置</h3>
        <div class="table-form">
            <Btn text="刷新" @click="getList" />
        </div>
        <div class="table-box">
            <el-table :data="tableData" height="100%" scrollbar-always-on>
                <el-table-column prop="timerId" label="定时器ID" align="center" />
                <el-table-column prop="timerName" label="定时器名称" align="center" />
                <el-table-column prop="intervalVal" label="定时间隔" align="center" />
                <el-table-column prop="remark" label="备注" align="center" />
                <el-table-column prop="rearIp" label="当前状态" align="center">
                    <template #default="scope">
                        <div class="ping" :style="{ '--uib-color': scope.row.timerId % 2 == 0 ? '#19bb5c' :'#c70a0a' }"></div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <div class="edit-group">
                            <Btn text="启动" size="small"></Btn>
                            <Btn text="停止" size="small" type="danger"></Btn>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination v-model:current-page="queryParams.page" background :page-size="queryParams.limit"
                    layout="total, prev, pager, next" :total="total" @current-change="getList" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { page } from '@/api/system/period'
const tableData = ref([])
const total = ref(0)
const queryParams = ref({
    page: 1,
    limit: 10
})
onMounted(() => {
    getList()
})
const getList = async () => {
    tableData.value = []
    const { data } = await page({ ...queryParams.value })
    tableData.value = data.list
    total.value = data.total
}
</script>

<style lang="scss" scoped>
.ping {
    --uib-size: 2.5vw;
    --uib-speed: 1s;
    --uib-color: #19bb5c;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
    margin: 0 auto;
}

.ping::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: var(--uib-color);
    animation: pulse7132 var(--uib-speed) linear infinite;
    transform: scale(0);
    opacity: 0;
}

.ping::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 20%;
    width: 20%;
    border-radius: 50%;
    background-color: var(--uib-color);

}

@keyframes pulse7132 {
    0% {
        transform: scale(0);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 0;
    }
}
</style>
