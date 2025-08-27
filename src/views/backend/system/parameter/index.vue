<template>
    <div class="backend-main">
        <h3 class="title">参数配置</h3>
        <div class="table-form">
            <el-radio-group v-model="tabIndex">
                <el-radio-button value="业务类型IP配置">业务类型IP配置</el-radio-button>
                <el-radio-button value="业务间隔阈值配置">业务间隔阈值配置</el-radio-button>
                <el-radio-button value="FTP服务配置">FTP服务配置</el-radio-button>
            </el-radio-group>
            <div class="btn-group">
                <Btn text="查询" />
                <Btn text="重置" />
                <Btn text="新增" />
            </div>
        </div>
        <div class="table-box">
            <el-table :data="tableData" height="100%" scrollbar-always-on>
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
            <Form ref="formRef" @success="getList" />
        </div>
    </div>
    
</template>

<script setup>
import Form from './components/Form.vue'
import { ref, onMounted } from 'vue'
import { page, del } from '@/api/system/trans'
import { ElMessageBox, ElMessage } from 'element-plus'
const formRef = ref(null)
const tabIndex = ref("业务类型IP配置")
const tableData = ref([])
const total = ref(0)
const queryParams = ref({
    page: 1,
    limit: 10
})
const openForm = (row = null) => {
    formRef.value.open(row)
}
const delCar = (id) => {
    ElMessageBox.confirm(
        '是否删除该数据?',
        '提示',
        { type: 'warning' }
    ).then(async () => {
        await del({ ids: id })
        ElMessage.success('删除成功')
        getList()
    })
}
onMounted(() => {
    // getList()
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
.btn-group {
    margin-left: vw(20);
}

.backend-main .table-box {
    height: calc(100vh - 26vh);
}
:deep(.el-radio-group) {
    .el-radio-button__inner {
        padding: vw(13) vw(20);
    }
}
</style>