<template>
  <div class="main">
    <div class="top">
      <div class="top-crad">
        <div class="title">成功切换率</div>
        <div class="content">
          <eLine></eLine>
        </div>
      </div>
      <div class="top-crad">
        <div class="title">失败切换率</div>
        <div class="content">
          <eLine></eLine>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="table-form">
        <el-form ref="form" :model="queryParams" style="display: flex;align-items: center;gap: 1vw;" @submit.prevent>
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
            <el-date-picker v-model="dateArr" value-format="YYYY-MM-DD" class="select-bay" style="width: 15vw;"
              popper-class="screen_popper" type="daterange" range-separator="-" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <div class="btn-group">
              <Btn text="查询" @click="initData" />
              <Btn text="重置" @click="reset" />
              <Btn text="导出" />
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-box">
        <el-table :data="tableData" height="90%" scrollbar-always-on>
          <el-table-column prop="captureTime" label="时间" align="center" />
          <el-table-column prop="protocolType" label="协议" align="center" />
          <el-table-column prop="srcIp" label="源IP" align="center" />
          <el-table-column prop="srcPort" label="源端口" align="center" />
          <el-table-column prop="dstIp" label="目标IP" align="center" />
          <el-table-column prop="dstPort" label="目标端口" align="center" />
          <el-table-column prop="packetLen" label="长度" align="center" />
          <el-table-column prop="sigDirection" label="信令方向" align="center" />
          <el-table-column prop="sigType" label="信令类型" align="center" />
          <el-table-column label="操作" min-width="120" align="center">
            <template #default="scope">
              <div class="edit-group">
                <div class="edit-btn" @click="openForm(scope.row)">详情</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination v-model:current-page="queryParams.page" background :page-size="queryParams.limit"
            layout="total, prev, pager, next" :total="total" @current-change="initData" />
        </div>
      </div>
    </div>
    <signalDialog ref="signalDialogRef" />
  </div>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import eLine from './components/chart/eLine.vue'
import Btn from './components/Btn.vue';
import signalDialog from './components/signalDialog.vue'
import { getById, list } from '@/api/signal'
const signalDialogRef = ref(null)
const total = ref(0)
const defaultQueryParams = ref({
  page: 1,
  limit: 10,
  dstIp: '', // 目标IP
  dstPort: '', // 目标端口
  srcIp: '', // 源IP
  srcPort: '', // 源端口
  endDate: '',
  startDate: ''
})
const queryParams = ref({ ...defaultQueryParams.value })
const dateArr = ref([])
const tableData = ref([])
watch(() => dateArr.value, (newValue) => {
  if (newValue.length && newValue[0]) {
    queryParams.value.startDate = newValue[0]
    queryParams.value.endDate = newValue[1]
  } else {
    queryParams.value.startDate = ''
    queryParams.value.endDate = ''
  }
})
onMounted(() => {
  initData()
})

const initData = async () => {
  const { data } = await list(queryParams.value)
  total.value = data.total
  tableData.value = data.list
}
const reset = () => {
  queryParams.value = { ...defaultQueryParams.value }
  initData()
}

const openForm = (row) => {
  signalDialogRef.value.open(row)
}
</script>

<style lang="scss" scoped>
.main {
  @include flex-between;
  flex-direction: column;
  margin-top: 2vh;
  height: 87vh;
  gap: vw(10);
  color: #fff;

  .top {
    width: 100%;
    height: 40%;
    display: flex;
    gap: vw(10);

    .top-crad {
      .title {
        width: fit-content;
        padding: vw(15) vw(20);
        position: relative;
        z-index: 1;
        font-size: vw(18);

        &::after {
          content: '';
          position: absolute;
          left: vw(20);
          bottom: vh(15);
          width: 50%;
          height: 0.5vw;
          background: linear-gradient(90deg, rgba(105, 255, 138, 0.5), transparent);
          border-radius: vw(5);
          z-index: -1;
        }
      }

      &:nth-child(2) {
        .title {
          &::after {
            background: linear-gradient(90deg, rgba(255, 74, 74, 0.5), transparent);
          }
        }
      }

      flex: 1;
      font-family: '优设标题黑';
      background: url('@/assets/screen/card-body2.png') no-repeat center center;
      background-size: 100% 100%;
      background-color: #3ca7ff2f;
      display: flex;
      flex-direction: column;

      .content {
        flex: 1;
      }
    }
  }

  .bottom {
    width: 100%;
    flex: 1;
    background: url('@/assets/screen/card-body2.png') no-repeat center center;
    background-size: 100% 100%;
    background-color: #3ca7ff2f;
    padding: vw(15);
    display: flex;
    flex-direction: column;

    .pagination {
      display: flex;
      justify-content: flex-end;
    }

    .table-box {
      height: 46vh;
    }

    .table-form {
      display: flex;
      align-items: center;
    }
  }
}
</style>
