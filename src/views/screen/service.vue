<template>
  <div class="main" v-if="trainItem" v-loading="loading">
    <div class="left">
      <h3>列车监测概况</h3>
      <div class="list" ref="listRef" @scroll="handleScroll" :class="{
        'mask-top': showTopMask,
        'mask-bottom': showBottomMask
      }">
        <div class="car-item" v-for="(item, index) in trainList" @click="trainId = item.vehicleCode" :key="index"
          :class="{ 'car-item-active': trainId == item.vehicleCode }">
          {{ item.vehicleCode }}
        </div>
      </div>
    </div>
    <div class="right">
      <div class="top-tab">
        <ul>
          <li v-for="(item, index) in tabList" @click="tabIndex = index" :key="index"
            :class="{ 'top-tab-active': tabIndex == index }">{{ item }}</li>
        </ul>
      </div>
      <div class="right-content">
        <div class="right-title">{{ trainItem.vehicleCode }} → {{ tabList[tabIndex] }}</div>
        <div class="car-to-zc">
          <div class="zc-chart">
            <dLine ref="vobcLineRef"></dLine>
          </div>
          <div class="zc-list">
            <el-table :data="vobcTableData" height="100%" style="width: 100%;" scrollbar-always-on>
              <el-table-column prop="captureDate" label="日期" align="center" min-width="80" />
              <el-table-column prop="captureTimePoint" label="时间" align="center" min-width="70" />
              <el-table-column prop="intervalSecond" label="接收间隔(s)" align="center" />
              <el-table-column prop="srcIp" label="源IP" align="center" />
              <el-table-column prop="srcPort" label="源端口" align="center" min-width="70"/>
              <el-table-column prop="dstIp" label="目标IP" align="center" />
              <el-table-column prop="dstPort" label="目标端口" align="center" min-width="70"/>
            </el-table>
          </div>
        </div>
      </div>
      <div class="right-content">
        <div class="right-title"> {{ tabList[tabIndex] }} ← {{ trainItem.vehicleCode }}</div>
        <div class="car-to-zc">
          <div class="zc-chart">
            <dLine ref="serviceLineRef"></dLine>
          </div>
          <div class="zc-list">
            <el-table :data="serviceTableData" height="100%" scrollbar-always-on>
              <el-table-column prop="captureDate" label="日期" align="center" min-width="70" />
              <el-table-column prop="captureTimePoint" label="时间" align="center" min-width="70" />
              <el-table-column prop="intervalSecond" label="接收间隔(s)" align="center" />
              <el-table-column prop="srcIp" label="源IP" align="center" />
              <el-table-column prop="srcPort" label="源端口" align="center" min-width="70"/>
              <el-table-column prop="dstIp" label="目标IP" align="center" />
              <el-table-column prop="dstPort" label="目标端口" align="center" min-width="70"/>
            </el-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import dLine from './components/chart/dLine.vue'
import { page } from '@/api/system/trans'
import { latestLineChart, latestIntervalTimeList } from '@/api/service'
const trainList = ref([])
const vobcTableData = ref([]);
const serviceTableData = ref([])
const tabList = ref(['ZC', 'CI', 'ATS'])
const vobcLineRef = ref(null)
const serviceLineRef = ref(null)

const trainId = ref(null)
const trainItem = computed(() => {
  return trainList.value.find(item => item.vehicleCode == trainId.value)
})
const tabIndex = ref(0)
const loading = ref(false)

const listRef = ref(null)
const showTopMask = ref(false)
const showBottomMask = ref(true)

onMounted(async () => {
  getTrainList()
})
watch([() => trainId.value, tabIndex], () => { initData() })

const initData = async () => {
  try {
    loading.value = true
    vobcTableData.value = []
    serviceTableData.value = []
    let serviceType = tabList.value[tabIndex.value]
    const [vobcRes, serviceRes, vobcTimeRes, serviceTimeRes] = await Promise.all([
      latestLineChart({ bizType: serviceType, direction: 1, vehicleCode: trainId.value }),
      latestLineChart({ bizType: serviceType, direction: 2, vehicleCode: trainId.value }),
      latestIntervalTimeList({ bizType: serviceType, direction: 1, vehicleCode: trainId.value }),
      latestIntervalTimeList({ bizType: serviceType, direction: 2, vehicleCode: trainId.value }),
    ]);

    vobcTableData.value = vobcTimeRes.data ? vobcTimeRes.data : []
    serviceTableData.value = serviceTimeRes.data ? serviceTimeRes.data : []
    vobcLineRef.value.init(vobcRes.data.timeInterval)
    serviceLineRef.value.init(serviceRes.data.timeInterval)
    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
const getTrainList = async () => {
  let { data } = await page({
    page: 1,
    limit: 200
  })
  trainList.value = data.list
  trainId.value = trainList.value[0].vehicleCode
  showBottomMask.value = trainList.value.length > 23
}
const handleScroll = () => {
  const el = listRef.value
  if (!el) return
  showTopMask.value = el.scrollTop > 0
  showBottomMask.value = el.scrollTop + el.clientHeight < el.scrollHeight - 4
}
</script>

<style lang="scss" scoped>
.main {
  @include flex-between;
  margin-top: 2vh;
  height: 87vh;
  gap: 1vw;
  color: #fff;

  .left {
    width: 23vw;
    min-width: 23vw;
    height: 100%;
    background: url('../../assets/screen/l-left-bg.png') no-repeat center center;
    background-size: 100% 100%;
    padding: vw(0) vw(30);
    font-family: '优设标题黑';
    margin-top: vh(50);

    h3 {
      font-size: vw(34);
      font-weight: 500;
      text-align: center;
      margin-bottom: vw(70);
    }

    .list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: vw(10);
      position: relative;
      z-index: 11;
      max-height: 65vh;
      overflow-y: auto;
      padding: 0 vw(40);

      -webkit-mask-image: none;
      mask-image: none;

      &.mask-top {
        -webkit-mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 100%);
        mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 100%);
      }

      &.mask-bottom {
        -webkit-mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%);
        mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 1) 0%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%);
      }

      &.mask-top.mask-bottom {
        -webkit-mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%);
        mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 1) 10%,
            rgba(0, 0, 0, 1) 90%,
            rgba(0, 0, 0, 0) 100%);
      }

      .car-item {
        width: 100%;
        height: vh(50);
        background: url(@/assets/screen/car-bg.png) no-repeat center center;
        background-size: 100% 100%;
        font-size: vw(18);
        @include flex-center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        flex-shrink: 0;

        &::after {
          content: '';
          position: absolute;
          width: 40%;
          height: 50%;
          background: rgb(29, 210, 255);
          border-radius: 50%;
          left: 50%;
          bottom: -40%;
          transform: translateX(-50%);
          filter: blur(vw(8));
        }

        &:hover,
        &.car-item-active {
          background: url(@/assets/screen/car-bg-active.png) no-repeat center center;
          background-size: 100% 100%;

          &::after {
            background: rgb(255, 255, 255);
          }
        }
      }
    }
  }

  .right {
    width: 74vw;
    height: 100%;
    background: url('@/assets/screen/card-body2.png') no-repeat center center;
    background-color: #3ca7ff2f;
    backdrop-filter: blur(vw(0));
    background-size: 100% 100%;
    padding: vw(10) vw(20);

    .top-tab {
      margin-bottom: vw(10);

      ul {
        display: flex;
        align-items: center;
        gap: vw(20);

        li {
          text-align: center;
          cursor: pointer;
          padding: vw(10) vw(20);
          font-family: '优设标题黑';
          position: relative;

          &::before {
            content: '';
            position: absolute;
            right: vw(-10);
            bottom: 50%;
            width: vw(1);
            height: vw(10);
            background: rgba(255, 255, 255, 0.329);
            transform: translateY(vw(5));
          }

          &:last-child {
            &::before {
              display: none;
            }
          }

          &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: vw(-5);
            width: vw(60);
            height: vw(20);
            background: url('@/assets/screen/car-icon.png') no-repeat;
            background-size: 100% 100%;
            opacity: 0;
            transform: translateX(vw(-20));
          }

          @keyframes car {
            to {
              opacity: 1;
              transform: translateY(vw(0));
            }
          }

          &:hover,
          &.top-tab-active {
            color: #11e4f3;
            text-shadow: 0 0 vw(5) #47d0da;

            &::after {
              animation: car .3s ease-in-out forwards;
            }

          }
        }
      }
    }

    .right-content {
      height: vh(420);

      .right-title {
        width: fit-content;
        font-size: vw(18);
        height: vh(50);
        line-height: vh(50);
        font-family: '优设标题黑';
        position: relative;

        &::after {
          content: '';
          position: absolute;
          width: vw(100);
          height: vw(2);
          background: linear-gradient(to right, #ffffff04, #0ebae6, #ffffff04);
          left: 50%;
          transform: translateX(-50%);
          bottom: vw(5);
          border-radius: vw(2);
          filter: blur(vw(1));
        }
      }

      .car-to-zc {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: vw(20);
        background-color: #00000044;

        >div {
          width: 50%;
          height: vh(370);

        }

        .zc-chart {
          padding: vw(10);
        }
      }
    }
  }
}
</style>
