<template>
    <div class="backend-main">
        <h3 class="title">车辆与IP绑定管理</h3>
        <div class="table-form">
            <el-form ref="form" :model="queryParams" class="form-box" @submit.prevent label-width="4.5vw">
                <el-form-item label="关键字：">
                    <el-input placeholder="请输入关键字" v-model="queryParams.keyword" clearable
                        style="width: 10vw;"></el-input>
                </el-form-item>
                <div class="btn-group">
                    <Btn text="查询" @click="getList" />
                    <Btn text="重置" @click="reset" />
                    <Btn text="新增" @click="openForm" />
                    <Btn v-if="multipleSelection.length" text="批量删除" type="danger" @click="delBatch" />
                </div>
            </el-form>
        </div>
        <div class="table-box">
            <el-table :data="tableData" height="100%" scrollbar-always-on @selection-change="handleSelectionChange">
                <el-table-column type="selection" :selectable="selectable" width="55" align="center" />
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
const formRef = ref(null) // 表单组件实例
const tableData = ref([]) // 表格数据
const total = ref(0)
const multipleSelection = ref([]) // 多选数据
// 查询参数
const queryParams = ref({
    page: 1,
    limit: 10
})
onMounted(() => {
    getList()
})
// 获取列表
const getList = async () => {
    tableData.value = []
    const { data } = await page({ ...queryParams.value })
    tableData.value = data.list
    total.value = data.total
}
// 打开新增/编辑弹窗
const openForm = (row = null) => {
    formRef.value.open(row)
}

// 多选回调
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

// 批量删除
const delBatch = async () => {
    const ids = multipleSelection.value.map(item => item.id).join(',')
    delCar(ids, true)
}

// 删除
const delCar = (ids, isBatch = false) => {
    ElMessageBox.confirm(
        isBatch ? '是否删除所选数据?' : '是否删除该数据?',
        '提示',
        { type: 'warning' }
    ).then(async () => {
        await del({ ids: ids })
        ElMessage.success('删除成功')
        getList()
    })
}

// 重置查询
const reset = () => {
    queryParams.value = {
        page: 1,
        limit: 10
    }
    getList()
}
</script>

<style lang="scss" scoped></style>