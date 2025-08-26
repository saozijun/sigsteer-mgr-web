<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`处理告警`" width="30%" @close="handleClose">
            <div v-if="info" class="dialog-content">
                <ul>
                    <li>
                        <span>列车号：</span>
                        <p>{{info.vehicleCode ? info.vehicleCode : '--'}}</p>
                    </li>
                    <li>
                        <span>方向：</span>
                        <p>{{ info.directionDesc }}</p>
                    </li>
                    <li class="f-center">
                        <span>业务类型：</span>
                        <p>{{ info.bizType }}</p>
                    </li>
                    <li>
                        <span>告警时间：</span>
                        <p>{{ info.captureTime }}</p>
                    </li>
                </ul>
            </div>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" type="info" @click="dialogVisible = false" />
                    <Btn text="标记已处理" @click="submit" />
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
    console.log('row',row);
    
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