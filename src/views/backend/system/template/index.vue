<template>
    <div class="car-main">
        <h3 class="title">车辆与IP绑定管理</h3>
        <div class="table-form">
            <Btn text="新增" @click="openForm" />
            <Btn text="刷新" @click="getList" />
            <Btn v-if="multipleSelection.length" text="批量删除" type="danger" @click="delBatch" />
        </div>
        <div class="table-box">
            <el-table :data="tableData" height="100%" scrollbar-always-on @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column prop="id" label="主键ID" align="center" />
                <el-table-column prop="vehicleCode" label="车辆编号" align="center" />
                <el-table-column prop="frontIp" label="车头IP地址" align="center" />
                <el-table-column prop="rearIp" label="车尾IP地址" align="center" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <div class="edit-group">
                            <div class="edit-btn" @click="openForm(scope.row)">编辑</div>
                            <div class="edit-btn" @click="delCar(scope.row.id)">删除</div>
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
    <Form ref="formRef" @success="getList" />
</template>

<script setup>
import Form from './components/Form.vue'
import { ref, onMounted } from 'vue'
import { page, del } from '@/api/system/trans'
import { ElMessageBox, ElMessage } from 'element-plus'
const formRef = ref(null)
const tableData = ref([])
const total = ref(0)
const multipleSelection = ref([])
const queryParams = ref({
    page: 1,
    limit: 10
})
const openForm = (row = null) => {
    formRef.value.open(row)
}

const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

const delBatch = async () => {
    const ids = multipleSelection.value.map(item => item.id).join(',')
    delCar(ids, true)
}
const delCar = (ids, isBatch = false) => {
    ElMessageBox.confirm(
        isBatch? '是否删除所选数据?' :'是否删除该数据?',
        '提示',
        { type: 'warning' }
    ).then(async () => {
        await del({ ids: ids})
        ElMessage.success('删除成功')
        getList()
    })
}
onMounted(() => {
    getList()
})
const getList = async () => {
    tableData.value = []
    const { data } = await page({ ...queryParams.value })
    // ElMessage.success('查询成功')
    tableData.value = data.list
    total.value = data.total
}
</script>

<style lang="scss" scoped>
.car-main {
    padding-top: vw(10);

    .title {
        font-size: vw(22);
        font-family: "优设标题黑";
        margin-bottom: vh(20);

    }

    .table-form {
        margin-bottom: vh(20);
        display: flex;
        gap: vw(15);
    }
}

.table-box {
    height: calc(100vh - 26vh);
    background-color: #0000001c;
    backdrop-filter: blur(vw(5));
    display: flex;
    flex-direction: column;
    padding-bottom: vw(20);

    .pagination {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: vw(20);
    }
}
</style>