<template>
    <div class="trans-main">
        <h3 class="title">业务分析</h3>
        <div class="table-form">
            <el-form ref="form" :model="queryParams" style="display: flex;align-items: center;gap: 1vw;flex-wrap: wrap;"
                @submit.prevent label-width="4.5vw">
                <el-form-item label="源IP：">
                    <el-input placeholder="请输入" v-model="queryParams.srcIp"></el-input>
                </el-form-item>
                <el-form-item label="源端口：">
                    <el-input placeholder="请输入" v-model="queryParams.srcPort"></el-input>
                </el-form-item>
                <el-form-item label="目标IP：">
                    <el-input placeholder="请输入" v-model="queryParams.dstIp"></el-input>
                </el-form-item>
                <el-form-item label="目标端口：">
                    <el-input placeholder="请输入" v-model="queryParams.dstPort"></el-input>
                </el-form-item>
                <el-form-item label="起止时间:">
                    <el-date-picker v-model="dateArr" value-format="YYYY-MM-DD" class="select-bay"
                        style="width: 10.3vw;" popper-class="screen_popper" type="daterange" range-separator="-"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="业务类型：">
                    <el-select placeholder="请选择" v-model="queryParams.bizType" style="width: 10.3vw;" class="select-bay"
                        popper-class="screen_popper">
                        <el-option label="ATS" value="ATS"></el-option>
                        <el-option label="CI" value="CI"></el-option>
                        <el-option label="ZC" value="ZC"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="接收间隔：">
                    <el-input v-model="queryParams.dstPort" style="width: 10.3vw;">
                        <template #prepend>大于</template>
                        <template #append>秒</template>
                    </el-input>
                </el-form-item>
                <div class="btn-group">
                    <Btn text="查询" />
                    <Btn text="重置" />
                    <Btn text="导出" />
                </div>
            </el-form>
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
.trans-main {
    padding-top: vw(10);

    .title {
        font-size: vw(22);
        font-family: "优设标题黑";
        margin-bottom: vh(20);

    }

    .table-form {
        margin-bottom: vh(20);
        display: flex;
        flex-wrap: wrap;
        gap: vw(15);
    }
}

.table-box {
    height: calc(100vh - 33vh);
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

:deep(.el-form-item) {
    margin-bottom: 0;
}
.btn-group {
    margin-left: vw(20);
}
</style>