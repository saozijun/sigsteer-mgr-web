<template>
    <div class="backend-main">
        <h3 class="title">文件日志记录</h3>
        <div class="table-form">
            <Btn text="刷新" @click="getList" />
        </div>
        <div class="table-box">
            <el-table :data="tableData" height="100%" scrollbar-always-on>
                <el-table-column prop="id" label="主键ID" align="center" />
                <el-table-column prop="processTime" label="转存时间" align="center" />
                <el-table-column prop="processTime" label="解析时间" align="center" />
                <el-table-column prop="processTime" label="清理时间" align="center" />
                <el-table-column prop="srcFolder" label="源文件夹" align="center" />
                <el-table-column prop="srcFilename" label="源文件名称" align="center" />
                <el-table-column prop="dstFolder" label="目的文件" align="center" />
                <el-table-column prop="dstFilename" label="目的文件名称" align="center" />
                <el-table-column prop="modFilename" label="修改文件名称" align="center" />
                <!-- 文件来源：0-车载、1-机房 -->
                <el-table-column prop="fileSource" label="文件来源" align="center" />
                <!-- 处理类型：0-转存、1-解析、2-清理 -->
                <el-table-column prop="processType" label="处理类型" align="center" />
                <el-table-column prop="bizType" label="业务类型" align="center" />
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
import { page } from '@/api/system/fileLog'
import { ElMessageBox, ElMessage } from 'element-plus'
const formRef = ref(null)
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