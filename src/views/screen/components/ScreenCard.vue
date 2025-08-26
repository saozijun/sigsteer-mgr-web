<template>
  <div class="crad-box">
    <div class="crad-main">
      <div class="title">
        <span>{{ title }}</span>
        <slot name="right"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: '标题'
  }
})
</script>

<style lang="scss" scoped>
.crad-box {
  width: 100%;
  background: #227fe917;

  .crad-main {
    width: 100%;
    color: #fff;
    overflow: hidden;

    .title {
      padding: vh(10) vw(15);
      min-height: vw(55.5);
      background: url('@/assets/screen/card-title.png') no-repeat center center;
      background-size: 100% 100%;
      @include flex-between;
      gap: 2vw;
      font-family: "优设标题黑";

      span {
        display: block;
        min-width: vw(160);
        font-size: vw(20);
        min-height: vw(26);
        line-height: vw(26);
      }

      // img {
      //   min-width: vw(460);
      //   position: relative;
      //   top: .2vh;
      // }
    }

    .content {
      width: 100%;
      height: 100%;
      background: url('@/assets/screen/card-body.png') no-repeat center center;
      background-size: 100% 100%;
    }
  }
}
</style>