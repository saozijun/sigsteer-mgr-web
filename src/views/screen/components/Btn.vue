<template>
  <button 
    :style="{ '--radius': borderRadius }" 
    @click="btnClick"
    :class="[
      size, 
      type, 
      { disabled, loading }
    ]"
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
    validator: (value) => ['primary', 'success', 'warning', 'danger'].includes(value)
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
button {
  --radius: 10vw;
  position: relative;
  font-family: inherit;
  border-radius: var(--radius);
  overflow: hidden;
  transition: all 0.3s;
  line-height: 1.5;
  cursor: pointer;
  min-width: fit-content;
  font-family: "优设标题黑";
  color: #fff;

  // 默认 primary
  &.primary {
    --green: #1ba6fd;
    border: vw(2) solid var(--green);
    background: linear-gradient(to right, rgba(27, 166, 253, 0.1) 1%, transparent 40%, transparent 60%, rgba(27, 166, 253, 0.1) 100%);
    box-shadow: inset 0 0 vw(10) rgba(27, 166, 253, 0.4), 0 0 vw(9) vw(3) rgba(27, 166, 253, 0.1);
  }
  &.success {
    --green: #00c853;
    border: vw(2) solid var(--green);
    background: linear-gradient(to right, rgba(0, 200, 83, 0.1) 1%, transparent 40%, transparent 60%, rgba(0, 200, 83, 0.1) 100%);
    box-shadow: inset 0 0 vw(10) rgba(0, 200, 83, 0.4), 0 0 vw(9) vw(3) rgba(0, 200, 83, 0.1);
  }
  &.warning {
    --green: #ff9800;
    border: vw(2) solid var(--green);
    background: linear-gradient(to right, rgba(255, 152, 0, 0.1) 1%, transparent 40%, transparent 60%, rgba(255, 152, 0, 0.1) 100%);
    box-shadow: inset 0 0 vw(10) rgba(255, 152, 0, 0.4), 0 0 vw(9) vw(3) rgba(255, 152, 0, 0.1);
  }
  &.danger {
    --green: #f44336;
    border: vw(2) solid var(--green);
    background: linear-gradient(to right, rgba(244, 67, 54, 0.1) 1%, transparent 40%, transparent 60%, rgba(244, 67, 54, 0.1) 100%);
    box-shadow: inset 0 0 vw(10) rgba(244, 67, 54, 0.4), 0 0 vw(9) vw(3) rgba(244, 67, 54, 0.1);
  }

  /* 尺寸样式 */
  &.small {
    font-size: vw(12);
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

button:hover:not(.disabled):not(.loading) {
  color: #82e6ff;
  box-shadow: inset 0 0 vw(10) rgba(27, 196, 253, 0.6), 0 0 vw(9) vw(3) rgba(27, 253, 156, 0.2);
}

button:before {
  content: "";
  position: absolute;
  left: vw(-20);
  width: vw(20);
  height: 100%;
  top: 0;
  transition: transform .4s ease-in-out;
  background: linear-gradient(to right, transparent 1%, rgba(27, 253, 156, 0.1) 40%, rgba(27, 253, 156, 0.1) 60%, transparent 100%);
}

button:hover:before {
  transform: translateX(vw(160));
}

/* loading 转圈动画 */
.spinner {
  display: inline-block;
  width: 1em;
  height: 1em;
  border: 0.15em solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
