<template>
    <div class="backend-main">
        <h3 class="title">角色管理</h3>
        <div class="table-form">
            <el-form ref="form" :model="queryParams" class="form-box" @submit.prevent label-width="4.5vw">
                <el-form-item label="关键字：">
                    <el-input placeholder="请输入角色名称或描述搜索" v-model="queryParams.q" clearable
                        @keyup.enter="getList"></el-input>
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
            <el-table :data="tableData" height="100%" scrollbar-always-on @selection-change="handleSelectionChange">
                <el-table-column type="selection" :selectable="selectable" width="55" align="center" />
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="code" label="角色编码" />
                <el-table-column :show-overflow-tooltip="true" prop="description" label="描述" />
                <el-table-column :show-overflow-tooltip="true" prop="createTime" label="创建日期" width="160" />
                <el-table-column label="操作" width="200" align="center">
                    <template #default="scope">
                        <div class="edit-group" >
                            <div class="edit-btn" @click="openForm(scope.row)" v-if="scope.row.name !== '超级管理员'">编辑</div>
                            <div class="edit-btn" @click="delCar(scope.row.id)" v-if="scope.row.name !== '超级管理员'">删除</div>
                            <div class="edit-btn" @click="openMenuForm(scope.row)">权限</div>
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
    <MenuForm ref="menuFormRef" @success="getList" />
</template>

<script setup>
import Form from './components/Form.vue'
import MenuForm from './components/MenuForm.vue'
import { ref, onMounted } from 'vue'
import { page, del } from '@/api/system/role'
import { ElMessageBox, ElMessage } from 'element-plus'
const formRef = ref(null) // 表单组件实例
const menuFormRef = ref(null)
const tableData = ref([]) // 表格数据
const total = ref(0)
const multipleSelection = ref([]) // 多选数据
const createTime = ref(undefined) // 创建时间筛选
const selectable = (row) => !["超级管理员"].includes(row.name)

// 查询参数
const queryParams = ref({
    page: 1,
    limit: 10,
    q: undefined,
    startTime: undefined,
    endTime: undefined,
})

onMounted(() => {
    getList()
})

// 获取列表
const getList = async () => {
    tableData.value = []
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
const openMenuForm = (row) => {
    menuFormRef.value.open(row)
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
        startTime: undefined,
        endTime: undefined,
    }
    createTime.value = undefined
    getList()
}

</script>

<style lang="scss" scoped></style>