<template>
  <div class="icon-body">
    <el-input v-model="iconName" class="icon-search" clearable placeholder="请输入图标名称" @clear="filterIcons"
      @input="filterIcons">
      <template #suffix><i class="el-icon-search el-input__icon" /></template>
    </el-input>
    <div class="icon-list">
      <div class="list-container">
        <div v-for="(item, index) in iconList" class="icon-item-wrapper" :key="index" @click="selectedIcon(item)">
          <div :class="['icon-item', { active: activeIcon === item }]">
            <svg-icon :icon-class="item" class-name="icon" style="height: 25px;width: 16px;" />
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import icons from './requireIcons'
import SvgIcon from '../SvgIcon/index.vue'

const props = defineProps({
  activeIcon: {
    type: String
  }
})

const iconName = ref('')
const iconList = ref(icons)
const emit = defineEmits(['selected'])

function filterIcons() {
  iconList.value = icons
  if (iconName.value) {
    iconList.value = icons.filter(item => item.indexOf(iconName.value) !== -1)
  }
}

function selectedIcon(name) {
  emit('selected', name)
  document.body.click()
}

function reset() {
  iconName.value = ''
  iconList.value = icons
}

defineExpose({
  reset
})
</script>

<style lang='scss' scoped>
.icon-body {
  width: 100%;

  .icon-search {
    position: relative;
    margin-bottom: vw(10);
  }

  .icon-list {
    height: vw(260);
    overflow: auto;

    .list-container {
      display: flex;
      flex-wrap: wrap;

      .icon-item-wrapper {
        width: calc(100% / 3);
        height: vw(30);
        line-height: vw(30);
        cursor: pointer;
        display: flex;

        .icon-item {
          display: flex;
          max-width: 100%;
          height: 100%;
          padding: 0 vw(5);
          &:hover {
            background: #ffffff31;
            border-radius: vw(5);
          }

          .icon {
            flex-shrink: 0;
          }

          span {
            display: inline-block;
            vertical-align: -0.15em;
            fill: currentColor;
            padding-left: vw(8);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }

        .icon-item.active {
          background: #ffffff31;
          border-radius: vw(5);
        }
      }
    }
  }
}
</style>