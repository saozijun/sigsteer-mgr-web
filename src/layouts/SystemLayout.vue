<template>
    <div class="system-layout">
        <Sidebar />
        <div class="main-content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
import Sidebar from '@/components/Sidebar.vue'
</script>

<style lang="scss" scoped>
.system-layout {
    height: 88vh;
    display: flex;
    align-items: flex-start;
    gap: vw(20);
    color: #fff;
    padding-top: vh(20);
    .main-content {
        flex: 1;
        height: 100%;
        overflow-y: auto;
    }
}
</style>