<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`详情`" width="30%" @close="handleClose">
            <div v-if="info" class="dialog-content">
                <ul>
                    <li>
                        <span>时间：</span>
                        <p>{{ info.captureTime ? info.captureTime : '--' }}</p>
                    </li>
                    <li>
                        <span>协议：</span>
                        <p>{{ info.protocolType ? info.protocolType : '--' }}</p>
                    </li>
                    <li>
                        <span>源IP：</span>
                        <p>{{ info.srcIp ? info.srcIp : '--' }}</p>
                    </li>
                    <li>
                        <span>源端口：</span>
                        <p>{{ info.srcPort ? info.srcPort : '--' }}</p>
                    </li>
                    <li>
                        <span>目标IP：</span>
                        <p>{{ info.dstIp ? info.dstIp : '--' }}</p>
                    </li>
                    <li>
                        <span>目标端口：</span>
                        <p>{{ info.dstPort ? info.dstPort : '--' }}</p>
                    </li>
                    <li>
                        <span>长度：</span>
                        <p>{{ info.packetLen ? info.packetLen : '--' }}</p>
                    </li>
                    <li>
                        <span>信令方向：</span>
                        <p>{{ info.sigDirection ? info.sigDirection : '--' }}</p>

                    </li>
                    <li>
                        <span>信令类型：</span>
                        <p>{{ info.sigType ? info.sigType : '--' }}</p>
                    </li>
                </ul>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" @click="dialogVisible = false" color="#949799" />
                    <Btn text="确定" @click="submit" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const info = ref({})
const handleClose = () => {

}
const submit = async () => {
    dialogVisible.value = false
    emit('success')
}

const open = (row = null) => {
    if (row) info.value = row
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>

<style scoped lang="scss">
.dialog-content {
    ul {
        display: flex;
        flex-direction: column;
        gap: vw(20);

        li {
            display: flex;
            align-items: flex-start;
            font-size: vw(16);

            span {
                color: rgb(69, 196, 255);
                display: block;
                width: vw(80);
                text-align: right;
            }

            &.f-center {
                align-items: center;
            }
        }
    }
}

.t-tag {
    background-color: rgba(43, 170, 255, 0.144);
    box-shadow: inset 0 0 vw(10) vw(2) rgba(13, 150, 58, 0.466);
    padding: vw(5) vw(15);
    font-size: vw(14);
    border-radius: vw(4);
}
</style>