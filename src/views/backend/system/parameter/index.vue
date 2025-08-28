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
                <Btn text="查询" @click="getList" />
                <Btn text="新增" @click="openForm" />
            </div>
        </div>
        <div class="table-box">
            <IP ref="ipRef" v-if="tabIndex === '业务类型IP配置'" />
            <Threshold ref="thresholdRef" v-else-if="tabIndex === '业务间隔阈值配置'"></Threshold>
            <FTP ref="ftpRef" v-else-if="tabIndex === 'FTP服务配置'"></FTP>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import IP from './ip/index.vue'
import Threshold from './threshold/index.vue'
import FTP from './ftp/index.vue'
const tabIndex = ref("业务类型IP配置")
const ipRef = ref(null)
const thresholdRef = ref(null)
const ftpRef = ref(null)
const getList = () => {
    if (tabIndex.value === "业务类型IP配置") {
        ipRef.value.getList()
    } else if (tabIndex.value === "业务间隔阈值配置") {
        thresholdRef.value.getList()
    } else if (tabIndex.value === "FTP服务配置") {
        ftpRef.value.getList()
    }
}
const openForm = (row = null) => {
    if (tabIndex.value === "业务类型IP配置") {
        ipRef.value.openForm(row)
    } else if (tabIndex.value === "业务间隔阈值配置") {
        thresholdRef.value.openForm(row)
    } else if (tabIndex.value === "FTP服务配置") {
        ftpRef.value.openForm(row)
    }
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