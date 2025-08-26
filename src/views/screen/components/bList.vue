<template>
  <div class="scrollable-table-container">
    <!-- 表头 -->
    <div class="table-header">
      <table>
        <colgroup>
          <col v-for="(header, index) in headers" :key="`header-${index}`"
            :style="{ width: getColumnWidth(header, index) }" />
          <col v-if="hasOperation" class="operation-column" />
        </colgroup>
        <thead>
          <tr>
            <th v-for="(header, index) in headers" :key="`th-${index}`">{{ header }}</th>
            <th v-if="hasOperation">操作</th>
          </tr>
        </thead>
      </table>
    </div>

    <!-- 表体 -->
    <div class="table-body" ref="tableBody" :style="tableBodyStyle">
      <div v-if="showEmpty" class="empty-state">
        <slot name="empty">
          <div class="empty-img">
            <img src="@/assets/screen/empty.png" alt="">
            <div class="empty-text">暂无数据</div>
          </div>
        </slot>
      </div>
      <div v-else class="native-scroll-wrapper">
        <table class="native-scroll-table">
          <colgroup>
            <col v-for="(header, index) in headers" :key="`native-${index}`"
              :style="{ width: getColumnWidth(header, index) }" />
            <col v-if="hasOperation" class="operation-column" />
          </colgroup>
          <tbody>
            <tr v-for="(row, index) in processedTableData" :key="`native-row-${index}`">
              <td v-for="(value, key, cellIndex) in row" :key="`native-cell-${cellIndex}`">{{ value }}</td>
              <td v-if="hasOperation">
                <slot name="operation" :row="tableData[index]" :index="index" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

const props = defineProps({
  headers: { type: Array, required: true },
  tableData: { type: Array, required: true },
  fieldMap: { type: Object, default: () => ({}) },
  scrollHeight: { type: Number, default: 300 },
  columnWidths: { type: Object, default: () => ({}) },
  hasOperation: { type: Boolean, default: false }
})

const tableBody = ref(null)

const tableBodyStyle = computed(() => {
  const vh = (props.scrollHeight / 1080) * 100
  return { '--table-body-height': `${vh}vh` }
})
const showEmpty = computed(() => {
  return props.tableData.length === 0
})
// 处理后的表格数据
const processedTableData = computed(() => {
  // 如果没有提供字段映射配置，直接返回原始数据
  if (!props.fieldMap || Object.keys(props.fieldMap).length === 0) {
    return props.tableData
  }

  // 根据字段映射配置转换数据
  return props.tableData.map(item => {
    const processedItem = {}
    props.headers.forEach(header => {
      const fieldKey = props.fieldMap[header]
      if (fieldKey) {
        processedItem[header] = item[fieldKey] !== undefined ? item[fieldKey] : '-'
      } else {
        processedItem[header] = '-'
      }
    })
    return processedItem
  })
})

// 获取列宽
const getColumnWidth = (header, index) => {
  // 优先使用传入的列宽配置
  if (props.columnWidths && props.columnWidths[header]) {
    return props.columnWidths[header]
  }
  // 其次使用索引配置
  if (props.columnWidths && props.columnWidths[index]) {
    return props.columnWidths[index]
  }
  // 默认宽度
  return 'auto'
}











</script>

<style lang="scss" scoped>
.scrollable-table-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.table-header {
  width: 100%;
  overflow: hidden;
}

.table-header table,
.table-body table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.table-body {
  width: 100%;
  height: var(--table-body-height);
  overflow-y: auto; // 超出显示滚动条
  position: relative;
}

.empty-state {
  width: 100%;
  height: var(--table-body-height);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 157, 255, 0.05);
}

.empty-state :deep(.el-empty) {
  padding: 0;
}

.empty-state :deep(.el-empty__image) {
  width: 20%;
  height: auto;
}

.empty-state :deep(.el-empty__description) {
  font-size: vw(14);
  color: #666666;
}

.native-scroll-wrapper {
  height: 100%;
  overflow-y: auto;
}

.native-scroll-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  padding: vw(12);
  text-align: center;
  font-size: vw(12);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-right: vw(1) solid #009dff67;
  border-left: vw(1) solid #009dff67;
}

.operation-column {
  width: vw(60);
}

th {
  background-color: rgba(0, 157, 255, 0.23);
  font-weight: bold;
}

tr:nth-child(odd) td {
  background-color: rgba(0, 89, 255, 0.1);
}

tr:nth-child(even) td {
  background-color: rgba(0, 187, 255, 0.135);
}

tr:hover td {
  background-color: #ffffff1d;
}

.empty-img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .empty-text {
    font-size: vw(14);
    color: #ffffffa6;
    margin-top: vh(20);
  }

  img {
    width: vw(120);
  }
}
</style>
