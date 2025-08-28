<template>
    <div class="backend-main">
        <h3 class="title">文件下载</h3>
        <div class="content-box">
            <div class="menu-list">
                <el-tree class="file-tree" draggable :data="data" :props="defaultProps" default-expand-all>
                    <template #default="{ node, data }">
                        <div class="custom-tree-node">
                            <img src="@/assets/images/document.png" alt="">
                            <span>{{ node.label }}</span>
                        </div>
                    </template>
                </el-tree>
            </div>
            <div class="file-box">
                <div class="file-list">
                    <el-table :data="tableData" height="100%" scrollbar-always-on
                        @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55" align="center" />
                        <el-table-column prop="name" label="文件名" align="center" />
                        <el-table-column prop="size" label="文件大小(字节)" align="center" />
                        <el-table-column prop="time" label="创建时间" align="center" />
                        <el-table-column label="操作" width="180" align="center">
                            <template #default="scope">
                                <div class="edit-group">
                                    <div class="edit-btn">下载</div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="file-group">
                    <Btn text="批量下载" :disabled="!multipleSelection.length"></Btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const multipleSelection = ref([])
const tableData = ref([{
    size: '2558706',
    name: '2025.08.26 09:00:00.zip',
    time: '2025.08.27 09:00:00',
    type: 'mp4',
    url: ''
}, {
    size: '2558706',
    name: '2025.08.27 09:00:00.zip',
    time: '2025.08.27 09:00:00',
    type: 'mp4',
    url: ''
}])
const defaultProps = {
    children: 'children',
    label: 'label',
}
const data = [
    {
        label: 'CBTC',
        children: [
            {
                label: '2025',
                children: [
                    {
                        label: '1月',
                    },
                    {
                        label: '2月',
                    }
                ],
            },
            {
                label: '2026',
                children: [
                    {
                        label: '1月',
                    },
                ],
            },
        ],
    },
    {
        label: 'ATS',
        children: [
            {
                label: '2025',
                children: [
                    {
                        label: '1月',
                        label: '2月',
                    },
                ],
            },
        ],
    },
    {
        label: 'ZC',
        children: [
            {
                label: '2025',
                children: [
                    {
                        label: '1月',
                    },
                ],
            },
        ],
    },
    {
        label: 'CI',
        children: [
            {
                label: '2025',
                children: [
                    {
                        label: '1月',
                        label: '2月',
                    },
                ],
            },
        ],
    }
]
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}
onMounted(() => {

})
</script>

<style lang="scss" scoped>
.content-box {
    display: flex;
    align-items: flex-start;
    gap: vw(20);
    height: calc(100vh - 19.5vh);
    // background: #ffffff34;

    .menu-list {
        width: vw(300);
        height: 100%;
        overflow-y: auto;
        background: #ffffff13;
        border-radius: vw(10);
        padding: vw(10);
        box-shadow: vw(5) vw(5) vw(5) rgba(0, 0, 0, 0.082);
    }

    .file-box {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        background: #ffffff13;
        backdrop-filter: blur(vw(6));
        padding: vw(10);
        border-radius: vw(10);

        .file-group {
            height: vw(50);
        }

        .file-list {
            height: calc(100% - vw(50));
        }
    }
}

.file-tree {
    border: none !important;
    width: 100%;
    overflow: hidden;

    :deep(.el-tree-node__content) {
        height: vw(44);
        border-radius: vw(4);

        .el-text {
            font-size: vw(17) !important;
        }
    }

    .custom-tree-node {
        flex: 1;
        overflow: hidden;
        span {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }
}

.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    gap: vw(10);

    img {
        width: vw(20);
    }
}
</style>