<template>
  <div class="top-main">
    <div class="title">业务质量监测系统</div>
    <div class="meun">
      <router-link class="menu-item" v-for="(item, index) in list" active-class="active" :key="item.name"
        :to="item.path">
        <span>{{ item.name }}</span>
        <div class="tips"></div>
      </router-link>
    </div>
    <div class="right">
      <div class="time">
        <div class="date"> {{ date }}</div>
        <img src="@/assets/screen/seting.png" alt="" @click="handleSetting">
      </div>
      <div>

      </div>
      <el-dropdown placement="bottom" popper-class="screen_popper">
        <div class="user">
          <img src="@/assets/screen/avatar.png" alt="">
          管理员
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout">退出账号</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import { ElMessage } from 'element-plus'

const router = useRouter()

const userStore = useUserStore()

const list = ref([
  { name: '首页', path: '/home' },
  { name: '业务分析', path: '/service' },
  { name: '信令分析', path: '/signal' },
])
const date = ref('')

const initDate = () => {
  date.value = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

onMounted(() => {
  setInterval(() => {
    initDate()
  }, 1000)
})

const handleSetting = () => {
  router.push('/backend')
}
const logout = () => {
  userStore.logout()
  ElMessage.success('退出成功')
  router.push('/login')
}
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color: #fff;
}

.top-main {
  width: 100%;
  height: vh(100);
  background: url('@/assets/screen/top-bg.png') no-repeat;
  background-position: -2.1vw 0;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: #fff;
  font-size: vw(16);
  font-family: "优设标题黑";
  // z-index: 11;
  .title {
    width: 21vw;
    text-align: center;
    font-size: vw(36);
    margin-top: vh(30);
    // font-weight: bold;
    letter-spacing: .1vw;
    filter: drop-shadow(0 0 0.5vw #ffffff53);
  }

  .right {
    width: 21vw;
    margin-top: vh(30);
    margin-right: vw(20);
    @include flex-between;

    .time {
      @include flex-between;
      font-size: vw(20);
      gap: 1vw;

      .date {
        min-width: vw(250);
      }

      img {
        width: vw(20);
        filter: drop-shadow(0 0 0.5vw #0478f3);
        cursor: pointer;

        &:hover {
          opacity: .8
        }
      }
    }

    .user {
      @include flex-between;
      gap: .3vw;
      color: #fff;
      font-size: vw(16);
      cursor: pointer;
      &:focus-visible {
        outline: none;
      }
      img {
        width: vw(40);
      }
    }
  }

  .meun {
    @include absolute-center;
    width: 55.3vw;
    height: vh(100);
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: .3vw;

    .menu-item {
      position: relative;
      top: vh(-5);
      flex: 1;
      height: 88%;
      font-size: vw(28);
      font-weight: bold;
      cursor: pointer;
      @include flex-center;
      transition: color 0.3s ease-in-out;
      // color: #afafaf;
      letter-spacing: .1vw;

      &:nth-child(1) {
        position: relative;

        >span {
          margin-right: -2.2vw;
        }

        .tips {
          width: 100%;
          height: 96%;
          position: absolute;
          opacity: 0;
          z-index: -1;
          background: url('@/assets/screen/t-btn-active.png') no-repeat;
          background-size: 100% 100%;
          transition: all 0.3s;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vh(40);
            background: url('@/assets/screen/t-btn-tips.png') no-repeat;
            background-size: 50% 100%;
            bottom: -25%;
            left: 32%;
          }
        }

        &:hover {
          .tips {
            opacity: 1;
          }
        }
      }

      &:nth-child(2) {
        height: 83%;
        flex: 0.88;
        border: .2vw solid transparent;

        .tips {
          width: 100%;
          height: 100%;
          position: absolute;
          opacity: 0;
          z-index: -1;
          background: #1495ff19;
          box-shadow: inset 0 0 2vw 0vw rgb(22 103 253 / 65%);
          transition: all 0.3s;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vh(40);
            background: url('@/assets/screen/t-btn-tips.png') no-repeat;
            background-size: 50% 100%;
            bottom: -32%;
            left: 27%;
          }
        }

        &:hover {
          border: .2vw solid #c3e5ff75;

          .tips {
            opacity: 1;
          }
        }
      }

      &:nth-child(3) {
        >span {
          margin-left: -2.2vw;
        }

        .tips {
          width: 100%;
          height: 96%;
          position: absolute;
          opacity: 0;
          z-index: -1;
          background: url('@/assets/screen/t-btn-active-r.png') no-repeat;
          background-size: 100% 100%;
          transition: all 0.3s;

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: vh(40);
            background: url('@/assets/screen/t-btn-tips.png') no-repeat;
            background-size: 50% 100%;
            bottom: -24%;
            left: 22%;
          }
        }

        &:hover {
          .tips {
            opacity: 1;
          }
        }
      }
    }

    .active {
      color: #fff !important;

      &:nth-child(2) {
        border: .2vw solid #c3e5ff75;
      }

      .tips {
        opacity: 1 !important;
      }
    }
  }
}
</style>