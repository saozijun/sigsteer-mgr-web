<template>
    <div class="main">
        <el-table :data="tableData" height="95%" scrollbar-always-on>
            <el-table-column prop="id" label="业务类型编码" align="center" />
            <el-table-column prop="vehicleCode" label="业务类型名称" align="center" />
            <el-table-column prop="frontIp" label="服务IP" align="center" />
            <el-table-column prop="rearIp" label="服务端口" align="center" />
            <el-table-column prop="rearIp" label="协议类型" align="center" />
            <el-table-column prop="rearIp" label="备注" align="center" />
            <el-table-column prop="rearIp" label="状态" align="center" />
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
    <Form ref="formRef" @success="getList" />

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
defineExpose({
    openForm,
    getList
})
</script>

<style lang="scss" scoped>
.main {
    height: 100%;
}
</style>