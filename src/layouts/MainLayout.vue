<template>
    <div class="layout">
        <ScreenHeader />
        <div class="main-content main-bay">
            <div style="position: relative;z-index: 1;"><router-view /></div>
        </div>
    </div>
</template>

<script setup>
import ScreenHeader from '@/components/ScreenHeader.vue'
</script>

<style lang="scss" scoped>
.layout {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    background: #000;
    flex-direction: column;
    // user-select: none;
    // -webkit-user-select: none;
    background: url("@/assets/screen/bg.png") no-repeat center center;
    background-size: cover;
}

.main-content {
    flex: 1;
    padding: 0 vw(20);
    position: relative;
    z-index: 1;
    &::before{
        content: '';
        position: absolute;
        width: vw(600);
        height: vw(800);
        top: 0%;
        right: 0%;
        transform: translateX(-50%);
        background-color: rgba(0, 132, 255, 0.253);
        border-radius: 50%;
        z-index: 0;
        filter: blur(vw(100));
    }
}
</style>