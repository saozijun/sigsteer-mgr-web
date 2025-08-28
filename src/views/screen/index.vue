<template>
  <div class="main">
    <div class="left">
      <ScreenCard title="列车概况">
        <div class="b-list">
          <div class="b-item">
            <span>总列车数</span>
            <p>
              <ScrollNumber :value="trainData.totalTrainsCount" suffix="辆" class="bg-scroll-number" />
            </p>
          </div>
          <div class="b-right">
            <ul>
              <li>
                <span>在线</span>
                <p>
                  <ScrollNumber :value="trainData.runningCount" suffix="辆" />
                </p>
              </li>
              <li>
                <span>离线</span>
                <p>
                  <ScrollNumber :value="trainData.pausedCount" suffix="辆" />
                </p>
              </li>
              <li>
                <span>告警</span>
                <p>
                  <ScrollNumber :value="trainData.alarmsCount" suffix="辆" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </ScreenCard>
      <ScreenCard title="列车告警走势">
        <div class="line-box">
          <bLine ref="dayAlarmLineRef" />
        </div>
      </ScreenCard>
      <ScreenCard title="列车最新告警">
        <div class="list-box">
          <div class="list-box-title">
            <el-select placeholder="选择列车" v-model="trainLatestAlarmFrom.vehicleCode" style="width: 60%;"
              class="select-bay" popper-class="screen_popper">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in trainList" :key="item.vehicleCode" :label="item.vehicleCode"
                :value="item.vehicleCode"></el-option>
            </el-select>
            <el-select placeholder="选择业务" v-model="trainLatestAlarmFrom.bizType" style="width: 40%;" class="select-bay"
              popper-class="screen_popper">
              <el-option label="ATS" value="ATS"></el-option>
              <el-option label="CI" value="CI"></el-option>
              <el-option label="ZC" value="ZC"></el-option>
            </el-select>
            <el-date-picker style="width: 80%;" v-model="trainLatestAlarmFrom.date" value-format="YYYY-MM-DD"
              class="select-bay" popper-class="screen_popper" type="daterange" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <Btn text="查询" @click="getTrainLatestAlarmInit" size="medium"></Btn>
          </div>
          <bList :headers="['列车号', '方向', '业务类型', '告警时间']" :table-data="trainDayAlarmData" :field-map="fieldMap"
            :column-widths="columnWidths" :has-operation="true">
            <template #operation="scope">
              <div style="width: 100%;color: #9ea3ff;text-align: center;cursor: pointer;" @click="openCar(scope.row)">处理
              </div>
            </template>
          </bList>
        </div>
      </ScreenCard>
    </div>
    <div class="map">
      <div class="map-box">
        <div class="map-box-title">
          <div class="title-item">
            <div class="type-bg type-danger">CI</div>
          </div>
          <div class="title-item">
            <div class="type-bg">ZC</div>
          </div>
          <div class="title-item">
            <div class="type-bg">ATS</div>
          </div>
        </div>
        <div class="map-box-content">
          <img src="@/assets/screen/car.webp" alt="">
          <div class="fan-shape"></div>
          <div class="trans-info">
            1号列车
          </div>
        </div>
      </div>
      <div class="chars-box">
        <cLine ref="cLineRef" />
      </div>
    </div>
    <div class="right">
      <ScreenCard title="CBTC告警统计">
        <div class="b-list">
          <div class="b-item">
            <span>总计告警</span>
            <p>
              <ScrollNumber :value="alarmStatData.totalAlarm" class="bg-scroll-number" />
            </p>
          </div>
          <div class="b-right">
            <ul>
              <li>
                <span>CI</span>
                <p>
                  <ScrollNumber :value="alarmStatData.ciCount" color="#efcd1d" />
                </p>

              </li>
              <li>
                <span>ZC</span>
                <p>
                  <ScrollNumber :value="alarmStatData.zcCount" color="#f5790d" />
                </p>
              </li>
              <li>
                <span>ATS</span>
                <p>
                  <ScrollNumber :value="alarmStatData.atsCount" color="#e33938" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </ScreenCard>
      <ScreenCard title="CI - 日告警率">
        <template #right>
          <div style="display: flex; align-items: center; gap: .5vw;">
            <el-date-picker style="width: 100%;" class="select-bay" popper-class="screen_popper"
              value-format="YYYY-MM-DD" v-model="dayAlarmDate.CI" type="daterange" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <Btn text="查询" @click="selectAlarm('CI', true)" size="medium"></Btn>
          </div>
        </template>
        <div class="line-box">
          <GradientBar ref="CIAlarmDayBarRef"></GradientBar>
        </div>
      </ScreenCard>
      <ScreenCard title="ZC - 日告警率">
        <template #right>
          <div style="display: flex; align-items: center; gap: .5vw;">
            <el-date-picker style="width: 100%;" class="select-bay" popper-class="screen_popper"
              value-format="YYYY-MM-DD" v-model="dayAlarmDate.ZC" type="daterange" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <Btn text="查询" @click="selectAlarm('ZC', true)" size="medium"></Btn>
          </div>
        </template>
        <div class="line-box">
          <GradientBar ref="ZCAlarmDayBarRef"></GradientBar>
        </div>
      </ScreenCard>
      <ScreenCard title="ATS - 日告警率">
        <template #right>
          <div style="display: flex; align-items: center; gap: .5vw;">
            <el-date-picker style="width: 100%;" class="select-bay" popper-class="screen_popper"
              value-format="YYYY-MM-DD" v-model="dayAlarmDate.ATS" type="daterange" range-separator="-"
              start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <Btn text="查询" @click="selectAlarm('ATS', true)" size="medium"></Btn>
          </div>
        </template>
        <div class="line-box">
          <GradientBar ref="ATSAlarmDayBarRef"></GradientBar>
        </div>
      </ScreenCard>
    </div>
  </div>
  <homeDialog ref="homeDialogRef" />
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import ScreenCard from './components/ScreenCard.vue'
import ScrollNumber from './components/ScrollNumber.vue'
import bLine from './components/chart/bLine.vue'
import cLine from './components/chart/cLine.vue'
import bList from './components/bList.vue'
import GradientBar from './components/chart/GradientBar.vue'
import homeDialog from './components/homeDialog.vue'
import Cron from '@/components/Cron/index.vue'
import { getAlarmStat, getTrainView, getTrainDayAlarm, getIntervalTime, getCbtcDayAlarmRate, getTrainLatestAlarm } from '@/api/home'
import { page } from '@/api/system/trans'

const homeDialogRef = ref(null)
// 字段映射配置
const fieldMap = {
  '列车号': 'vehicleCode',
  '方向': 'directionDesc',
  '业务类型': 'bizType',
  '告警时间': 'captureTime'
}

// 列宽配置
const columnWidths = {
  '列车号': '22%',
  '方向': '25%',
  '业务类型': '20%',
  '告警时间': '30%'
}
const dayAlarmLineRef = ref()
const ZCAlarmDayBarRef = ref()
const CIAlarmDayBarRef = ref()
const ATSAlarmDayBarRef = ref()
const cLineRef = ref()

const trainList = ref([])
const alarmStatData = ref({}) // 告警统计数据
const trainData = ref({}) // 列车概况数据
const trainDayAlarmData = ref([]) // 最新列车告警列表数据
const trainLatestAlarmFrom = ref({
  bizType: "ATS",
  date: [],
  vehicleCode: ""
})
const dayAlarmDate = ref({
  CI: [],
  ZC: [],
  ATS: []
})
onMounted(async () => {
  getTrainList()
  await nextTick()
  initData()
})

// 初始化数据
const initData = async () => {
  let alarmRes = await getAlarmStat()
  alarmStatData.value = alarmRes.data
  let trainRes = await getTrainView()
  trainData.value = trainRes.data
  let trainDayAlarmRes = await getTrainDayAlarm()
  dayAlarmLineRef.value.init(trainDayAlarmRes.data)
  let intervalTimeRes = await fetchAllBizTypes()
  cLineRef.value.init(intervalTimeRes)
  selectAlarm('CI,ZC,ATS')

  // 最新列车告警列表
  getTrainLatestAlarmInit()
}

// 获取所有业务类型的时间间隔数据
const fetchAllBizTypes = async () => {
  try {
    const [ciRes, zcRes, atsRes] = await Promise.all([
      getIntervalTime({ bizType: 'CI' }),
      getIntervalTime({ bizType: 'ZC' }),
      getIntervalTime({ bizType: 'ATS' })
    ]);
    const result = {
      date: ciRes.data.date,
      CI: ciRes.data.averageTime,
      ZC: zcRes.data.averageTime,
      ATS: atsRes.data.averageTime
    };
    // 数据反向
    result.date.reverse();
    result.CI.reverse();
    result.ZC.reverse();
    result.ATS.reverse();
    console.log('result', result);
    return result;

  } catch (error) { }
};

// 日告警率 获取
const selectAlarm = async (type, isSearch = false) => {
  let typeAll = type.split(',')
  typeAll.map(async (item) => {
    let tempData = {
      bizType: item
    }
    if (dayAlarmDate.value[typeAll[0]] && dayAlarmDate.value[typeAll[0]].length) {
      tempData.startDate = dayAlarmDate.value[item][0]
      tempData.endDate = dayAlarmDate.value[item][1]
    }
    let trainDayAlarmRes = await getCbtcDayAlarmRate(tempData)
    if (item === 'CI') {
      CIAlarmDayBarRef.value.init(trainDayAlarmRes.data)
    } else if (item === 'ZC') {
      ZCAlarmDayBarRef.value.init(trainDayAlarmRes.data)
    } else if (item === 'ATS') {
      ATSAlarmDayBarRef.value.init(trainDayAlarmRes.data)
    }
  })

}


const getTrainLatestAlarmInit = async () => {
  let trainLatestAlarmRes = await getTrainLatestAlarm({
    bizType: trainLatestAlarmFrom.value.bizType,
    startDate: trainLatestAlarmFrom.value.date[0],
    endDate: trainLatestAlarmFrom.value.date[1],
    vehicleCode: trainLatestAlarmFrom.value.vehicleCode
  })
  trainDayAlarmData.value = trainLatestAlarmRes.data || []
}
const getTrainList = async () => {
  let { data } = await page({
    page: 1,
    limit: 200
  })
  trainList.value = data.list
}

const openCar = (item) => {
  console.log('item', item);
  homeDialogRef.value.open(item)

}
</script>

<style lang="scss" scoped>
.main {
  @include flex-between;
  margin-top: 2vh;
  height: 87vh;
  column-gap: vw(20);

  .left,
  .right {
    width: 26vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5vh;
  }

  .right {
    .b-right {
      ul li {
        p {
          color: #efcd1d;
        }

        &:nth-child(2) {
          p {
            color: #f5790d;
          }
        }

        &:nth-child(3) {
          p {
            color: #e33938;
          }
        }
      }
    }
  }

  .b-list {
    display: flex;
    align-items: flex-start;
    gap: vw(20);
    // margin-top: 2vh;
    padding: vw(20);

    .b-item {
      flex: 1;
      font-size: vw(24);

      .bg-scroll-number {
        font-size: vw(36);
      }

      >span {
        color: #03b5fb;
        font-family: "优设标题黑";
        filter: drop-shadow(vw(2) vw(2) vw(2) rgba(14, 194, 222, 0.542));
      }

      p {
        font-size: vw(36);
        margin-top: vh(20);

        >span {
          font-size: vw(18);
          position: relative;
          top: vw(-2);
        }
      }
    }

    .b-right {
      flex: 2;

      ul {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        li {
          flex: 1;
          position: relative;

          >span {
            font-size: vw(14);
          }

          p {
            font-size: vw(28);
            margin-top: vh(34);

            >span {
              font-size: vw(18);
            }
          }

          &::after {
            content: '';
            position: absolute;
            width: vw(1);
            height: vh(80);
            background: #ffffff31;
            left: vw(-10);
            top: vh(8);
          }

          &::before {
            content: '';
            position: absolute;
            width: vw(4);
            height: vh(6);
            border-radius: vw(1);
            background: #efcd1d;
            left: vw(-11);
            top: vh(8);
          }

          &:nth-child(2) {
            &::before {
              background: #f5790d;
            }
          }

          &:nth-child(3) {
            &::before {
              background: #e33938;
            }
          }
        }
      }
    }
  }

  .line-box {
    width: 100%;
    height: 15vh;
    padding: vh(10);
  }

  .list-box {
    width: 100%;
    // margin-top: 2vh;
    height: 37.7vh;
    padding: vw(10);

    .list-box-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: vw(10);
      margin-bottom: vh(10);

      .btn {
        width: vw(130);
        border-radius: vw(50);
        background: #159bd583;
        color: #fff;
        padding: vh(8) 0;
        font-size: vw(14);
        text-align: center;
        cursor: pointer;

        &:hover {
          background: #0f7fae;
        }
      }
    }
  }

  .map {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2vh;

    .map-box {
      width: 100%;
      flex: 1;
      position: relative;
      .map-box-title {
        width: 75%;
        height: vw(150);
        margin-top: vw(80);
        gap: vw(40);
        color: #fff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        opacity: 0;
        animation: carText 1s 1s ease forwards;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: vw(4) solid #24c0e749;
          z-index: -1;
        }

        .title-item {
          width: vw(150);
          height: vw(150);
          position: absolute;
          animation: wyBreathe 6s ease-out infinite;

          &:nth-child(1) {
            left: -11%;
            top: -10%;
          }

          &:nth-child(2) {
            right: -10%;
            top: -10%;
            animation-duration: 5.5s;
          }

          &:nth-child(3) {
            right: 38%;
            bottom: 55%;
            animation-duration: 8s;
          }

          .type-bg {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: url('@/assets/screen/wy-icon.svg') no-repeat center;
            background-position: vw(0) vw(-5);
            background-size: 100%;
            position: absolute;
            left: 0;
            top: 0;
            font-size: vw(26);
            font-family: "优设标题黑";
            @include flex-center;
            text-shadow: vw(0) vw(0) vw(10) rgba(255, 255, 255, 0.829);
            padding-top: vw(16);
            &.type-danger {
              background: url('@/assets/screen/wy2-icon.svg') no-repeat center;
              background-position: vw(0) vw(-5);
              background-size: 100%;
              color: #fd8787;
              text-shadow: vw(0) vw(0) vw(4) rgba(233, 17, 17, 0.829);
              animation: wyDanger 1s infinite;
            }
          }
        }

        @keyframes spin013151 {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes wyDanger {
          50% {
            transform: scale(1.1);
            filter: drop-shadow(vw(0) vw(0) vw(10) rgba(212, 20, 20, 0.829));
          }
        }

        @keyframes wyBreathe {
          50% {
            transform: translate(0%, 10%);
          }
        }
      }

      .map-box-content {
        position: relative;
        height: 100%;

        img {
          width: 100%;
          position: absolute;
          left: vw(20);
          top: vw(150);
          z-index: -1;
          filter: drop-shadow(vw(0) vw(0) vw(10) rgba(20, 135, 212, 0.829));
          user-select: none;
          -webkit-user-select: none;
          animation: carInPage 1s ease forwards;
          transform: translate(100%, 0%) scale(.5);
        }

        .fan-shape {
          width: vw(580);
          height: vw(150);
          position: absolute;
          left: 50%;
          top: vw(190);
          transform: translateX(-50%);
          background: linear-gradient(to top, transparent 0%, rgba(6, 151, 235, 0.192) 50%, transparent 100%);
          clip-path: polygon(50% 100%, 0 0, 100% 0);
          opacity: 0;
          animation: carText 1s 1s ease forwards;
        }

        .trans-info {
          color: #fff;
          font-size: vw(32);
          font-family: "优设标题黑";
          position: absolute;
          left: 5%;
          top: vw(5);
          opacity: 0;
          animation: carText 1s 1s ease forwards;
          letter-spacing: .2vw;
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vw(20);
            background: linear-gradient(to left, transparent, rgba(49, 163, 240, 0.192));
            left: -10%;
            bottom: -10%;
          }
        }

        @keyframes carInPage {
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes carText {
          100% {
            opacity: 1;
          }
        }
      }
    }

    .chars-box {
      width: 100%;
      height: 30%;
      padding: vh(15) vw(10);
      background: url('@/assets/screen/card-body2.png') no-repeat center center;
      background-color: #227fe917;
      background-size: 100% 100%;
    }
  }
}

:deep(.crad-main .title .el-date-editor.el-input__wrapper) {
  height: vw(32) !important;
  line-height: vw(32) !important;
}

:deep(.crad-main .list-box .el-date-editor.el-input__wrapper) {
  height: vw(32) !important;
  line-height: vw(32) !important;
}

:deep(.crad-main .el-select__wrapper) {
  height: vw(32) !important;
  line-height: vw(32) !important;
}
</style>
