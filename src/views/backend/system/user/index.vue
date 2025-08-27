<template>
    <div class="backend-main">
        <h3 class="title">用户管理</h3>
        <div class="table-form">
            <el-form ref="form" :model="queryParams" class="form-box" @submit.prevent label-width="4.5vw">
                <el-form-item label="关键字：">
                    <el-input placeholder="输入用户名或昵称或邮箱搜索" v-model="queryParams.q" clearable
                        @keyup.enter="getList"></el-input>
                </el-form-item>
                <el-form-item label="用户状态：">
                    <el-select v-model="queryParams.enabled" clearable placeholder="请选择" class="select-bay"
                        popper-class="screen_popper" @change="getList">
                        <el-option label="启用" :value="0" />
                        <el-option label="禁用" :value="1" />
                    </el-select>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker v-model="createTime" type="daterange" range-separator="-" start-placeholder="开始日期"
                        end-placeholder="结束日期" value-format="YYYY-MM-DD">
                    </el-date-picker>
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
            <el-table :data="tableData" height="100%" scrollbar-always-on @selection-change="handleSelectionChange"
                @sort-change="sortChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column prop="username" label="用户名" :show-overflow-tooltip="true" />
                <el-table-column prop="nickName" label="昵称" :show-overflow-tooltip="true" />
                <el-table-column prop="gender" label="性别" />
                <el-table-column prop="phone" label="电话" width="120" :show-overflow-tooltip="true" />
                <el-table-column prop="email" label="邮箱" width="150" :show-overflow-tooltip="true" />
                <el-table-column prop="enabled" label="状态" align="center" width="80">
                    <template #default="scope">
                        <el-switch v-model="scope.row.enabled" :active-value="0" :inactive-value="1"
                            active-color="#409EFF" inactive-color="#F56C6C" @change="changeEnabled(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="160" sortable="custom" />
                <el-table-column label="操作" width="200" align="center" fixed="right">
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
import { page, del, update, changeStatus } from '@/api/system/user'
import { ElMessageBox, ElMessage } from 'element-plus'
const formRef = ref(null) // 表单组件实例
const tableData = ref([]) // 表格数据
const total = ref(0)
const multipleSelection = ref([]) // 多选数据
const createTime = ref(undefined) // 创建时间筛选
// 查询参数
const queryParams = ref({
    page: 1,
    limit: 10,
    q: undefined,
    enabled: undefined,
    startTime: undefined,
    endTime: undefined,
    // orders: [{ column: 'createTime', order: 'descending' }]
})

onMounted(() => {
    getList()
})

// 获取列表
const getList = async () => {
    tableData.value = []
    // 处理时间筛选
    if (createTime.value && createTime.value.length === 2) {
        queryParams.value.startTime = createTime.value[0]
        queryParams.value.endTime = createTime.value[1]
    } else {
        queryParams.value.startTime = undefined
        queryParams.value.endTime = undefined
    }

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
        limit: 10,
        q: undefined,
        enabled: undefined,
        startTime: undefined,
        endTime: undefined,
    }
    createTime.value = undefined
    getList()
}

// 排序
const sortChange = ({ prop, order }) => {
    const orderItem = { column: prop, order: order === 'ascending' ? 'asc' : 'desc' }
    const orders = queryParams.value.orders
    const filterOrders = orders.filter(item => item.column !== prop)
    filterOrders.push(orderItem)
    queryParams.value.orders = filterOrders
    getList()
}

// 改变用户状态
const changeEnabled = (row) => {
    const statusText = row.enabled === 0 ? '启用' : '禁用'
    ElMessageBox.confirm(
        `此操作将${statusText}用户${row.username}, 是否继续？`,
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }
    ).then(async () => {
        await changeStatus(row.id, row.enabled)
        ElMessage.success(`${statusText}成功`)
        getList()
    }).catch(() => {
        // 恢复原状态
        row.enabled = row.enabled === 0 ? 1 : 0
    })
}
</script>

<style lang="scss" scoped></style>