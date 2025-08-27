<template>
    <div class="sidebar">
        <el-menu :default-active="activeIndex" class="sidebar-menu" router
            background-color="#ffffff" text-color="#333333" active-text-color="#000000" unique-opened>
            <el-sub-menu v-for="(item, index) in sidebarRouters" :key="item.name" :index="item.name">
                <template #title>
                    <svg-icon :icon-class="item.meta.icon" />
                    <span style="margin-left: .6vw;">{{ item.title }}</span>
                </template>
                <el-menu-item v-for="(child) in item.children" :key="child.name" :index="child.path">
                    {{ child.title }}
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import usePermissionStore from '@/stores/modules/permission'

const route = useRoute()
const activeIndex = computed(() => route.path)
const permissionStore = usePermissionStore()
const sidebarRouters = computed(() => permissionStore.sidebarRouters)
</script>

<style lang="scss" scoped>
.sidebar {
    width: vw(260);
    height: 100%;
    background-color: #00000000;
    backdrop-filter: blur(vw(10));
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