<template>
  <button 
    :style="{ '--radius': borderRadius }" 
    @click="btnClick"
    :class="[ size, type, { disabled, loading } ]"
    :disabled="disabled || loading"
  >
    <!-- loading 状态下显示转圈 -->
    <span v-if="loading" class="spinner"></span>
    <slot v-else>{{ text }}</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '按钮'
  },
  borderRadius: {
    type: String,
    default: '10vw'
  },
  size: {
    type: String,
    default: 'large',
    validator: (value) => ['small', 'medium', 'large'].includes(value)
  },
  type: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'success', 'warning', 'danger', 'info'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const btnClick = () => {
  if (props.disabled || props.loading) return
  emit('click')
}
</script>

<style lang="scss" scoped>
@use "sass:map"; // ✅ 引入 map 模块

/* 定义主题 map */
$themes: (
  primary: (
    color: #1ba6fd,
    hover: #82e6ff
  ),
  success: (
    color: #00c853,
    hover: #4dff88
  ),
  warning: (
    color: #ff9800,
    hover: #ffc266
  ),
  danger: (
    color: #f44336,
    hover: #ff7961
  ),
  info: (
    color: #607d8b,
    hover: #90a4ae
  )
);

button {
  --radius: 10vw;
  position: relative;
  font-family: inherit;
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.5;
  cursor: pointer;
  width: fit-content;
  min-width: vw(70);
  font-family: "优设标题黑";
  color: #fff;

  /* 根据 map 生成不同主题样式 */
  @each $name, $config in $themes {
    &.#{$name} {
      $color: map.get($config, color);
      $hover: map.get($config, hover);

      border: vw(2) solid $color;
      background: linear-gradient(
        to right,
        rgba($color, 0.1) 1%,
        transparent 40%,
        transparent 60%,
        rgba($color, 0.1) 100%
      );
      box-shadow: inset 0 0 vw(10) rgba($color, 0.4),
                  0 0 vw(9) vw(3) rgba($color, 0.1);

      &:hover:not(.disabled):not(.loading) {
        color: $hover;
        box-shadow: inset 0 0 vw(10) rgba($color, 0.6),
                    0 0 vw(9) vw(3) rgba($color, 0.2);
      }
    }
  }

  /* 尺寸样式 */
  &.small {
    min-width: fit-content;
    font-size: vw(13);
    padding: vw(6) vw(12);
  }
  &.medium {
    font-size: vw(14);
    padding: vw(8) vw(16);
  }
  &.large {
    font-size: vw(16);
    padding: vw(10) vw(20);
  }

  /* 禁用状态 */
  &.disabled {
    cursor: not-allowed;
    opacity: 0.6;
    box-shadow: none;
    background: #888 !important;
    border-color: #888 !important;
    color: #ccc !important;
  }

  /* loading 状态 */
  &.loading {
    cursor: wait;
  }
}

/* 其它样式保持不变 */
button:before {
  content: "";
  position: absolute;
  left: vw(-20);
  width: vw(20);
  height: 100%;
  top: 0;
  transition: transform .4s ease-in-out;
  background: linear-gradient(
    to right,
    transparent 1%,
    rgba(255, 255, 255, 0.1) 40%,
    rgba(255, 255, 255, 0.1) 60%,
    transparent 100%
  );
}

button:hover:before {
  transform: translateX(vw(160));
}

/* loading 转圈动画 */
.spinner {
  display: inline-block;
  width: vw(14);
  height: vw(14);
  border: vw(2) solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
