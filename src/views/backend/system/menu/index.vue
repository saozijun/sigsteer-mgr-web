<template>
    <div class="backend-main">
        <h3 class="title">菜单管理</h3>
        <div class="table-form">
            <Btn text="新增" @click="handleAdd" />
            <Btn text="刷新" @click="getList" />
            <Btn text="展开/折叠" @click="toggleExpandAll" />
            <Btn v-if="multipleSelection.length" text="批量删除" type="danger" @click="delBatch" />
        </div>
        <div class="table-box">
            <el-table
                v-if="refreshTable"
                ref="menuTable"
                :data="tableData"
                height="100%"
                scrollbar-always-on
                row-key="id"
                :default-expand-all="isExpandAll"
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column :show-overflow-tooltip="true" label="菜单标题" width="125px" prop="title" />
                <el-table-column prop="icon" label="图标" align="center" width="60px">
                    <template #default="scope">
                        <svg-icon :icon-class="scope.row.icon" />
                    </template>
                </el-table-column>
                <el-table-column prop="sort" align="center" label="排序">
                    <template #default="scope">
                        {{ scope.row.sort }}
                    </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="true" prop="permission" label="权限标识" />
                <el-table-column :show-overflow-tooltip="true" prop="component" label="组件路径" />
                <!-- <el-table-column prop="iframe" label="外链" width="75px">
                    <template #default="scope">
                        <span v-if="scope.row.iframe">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cache" label="缓存" width="75px">
                    <template #default="scope">
                        <span v-if="scope.row.cache">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="hidden" label="可见" width="75px">
                    <template #default="scope">
                        <span v-if="scope.row.hidden">否</span>
                        <span v-else>是</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建日期" width="135px" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <div class="edit-group">
                            <div class="edit-btn" @click="handleEdit(scope.row)">编辑</div>
                            <div class="edit-btn" @click="delCar(scope.row.id)">删除</div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
    <Form ref="formRef" @success="getList" />
</template>

<script setup>
import Form from './components/Form.vue'
import { ref, onMounted, nextTick } from 'vue'
import { treeList, del } from '@/api/system/menu'
import { ElMessageBox, ElMessage } from 'element-plus'
import SvgIcon from "@/components/SvgIcon/index.vue"
const formRef = ref(null)
const tableData = ref([])
const multipleSelection = ref([])
const isExpandAll = ref(true)
const refreshTable = ref(true)

onMounted(() => {
    getList()
})

const getList = async () => {
    const { data } = await treeList()
    tableData.value = data
}

const handleAdd = () => {
    formRef.value.open()
}

const handleEdit = (row) => {
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

// 展开/折叠操作
const toggleExpandAll = () => {
    refreshTable.value = false
    isExpandAll.value = !isExpandAll.value
    nextTick(() => {
        refreshTable.value = true
    })
}
</script>

<style lang="scss" scoped>
.table-box {
    height: calc(100vh - 25.5vh) !important;
}
</style>