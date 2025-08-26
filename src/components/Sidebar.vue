<template>
    <div class="sidebar">
        <el-menu :default-active="activeIndex" class="sidebar-menu" @select="handleSelect" router
            background-color="#ffffff" text-color="#333333" active-text-color="#000000" unique-opened>
            <el-sub-menu v-for="(item, index) in menu" :key="item.name" :index="item.name">
                <template #title>
                    <el-icon>
                        <MessageBox />
                    </el-icon>
                    <span>{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(child, childIndex) in item.children" :key="child.name" :index="child.path">
                    {{ child.title }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  MessageBox,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

const route = useRoute()
const activeIndex = computed(() => route.path)

const menu = ref([
    {
        title: '数据管理',
        name: 'dataManage',
        children: [
            { title: '业务分析', name: 'business', path: '/backend/data/business' },
            { title: '信令分析', name: 'signaling', path: '/backend/data/signaling' },
            { title: '文件下载', name: 'document', path: '/backend/data/document' },
        ]
    }, {
        title: '日志管理',
        name: 'logManage',
        children: [
            { title: '文件日志记录', name: 'fileLog', path: '/backend/log/fileLog' }
        ]
    }, {
        title: '系统管理',
        name: 'systemManage',
        children: [
            { title: '车辆管理', name: 'business', path: '/backend/system/trans' },
            { title: '参数配置', name: 'parameter', path: '/backend/system/parameter' },
            { title: '周期配置', name: 'period', path: '/backend/system/period' },
            { title: '基站管理', name: 'baseStation', path: '/backend/system/baseStation' },
            { title: '用户管理', name: 'user', path: '/backend/system/user' },
            { title: '角色管理', name: 'role', path: '/backend/system/role' },
            { title: '菜单管理', name: 'menu', path: '/backend/system/menu' },
        ]
    },
])

const handleSelect = (key, keyPath) => {
    console.log('Selected menu:', key, keyPath)
}
</script>

<style lang="scss" scoped>
.sidebar {
    width: vw(260);
    height: 100%;
    background-color: #00000000;
    backdrop-filter: blur(vw(10));
    // border: vw(1) solid #ffffff1d;
    border-radius: vw(10);
    overflow: hidden;
}

.sidebar-menu {
    border-right: none;
}

:deep(.el-menu) {
    border-right: none;
}

:deep(.el-sub-menu__title) {
    font-size: vw(18);
    font-weight: 500;
    border-radius: vw(6);
    &:hover {
        background-color: #e9ecef1a !important;
    }
}

:deep(.el-menu-item) {
    font-size: vw(16);
    border-radius: vw(6);
}

:deep(.el-menu-item:hover) {
    background-color: #e9ecef !important;
}

:deep(.el-menu-item.is-active) {
    background-color: #e6f7ff !important;
    color: #007bff !important;
}
</style>