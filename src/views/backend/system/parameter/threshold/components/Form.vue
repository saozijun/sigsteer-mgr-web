<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`${form.id ? '编辑' : '新增'}业务间隔阈值`" width="40%" @close="handleClose" append-to-body>
            <el-form ref="formRef" :model="form" label-width="80px" style="margin-top: 2vh;" :rules="rules">
               <el-form-item label="业务类型" prop="vehicleCode">
                    <el-select v-model="form.vehicleCode" placeholder="请选择" popper-class="screen_popper">
                        <el-option label="LTE-M" value="LTE-M"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="阈值" prop="frontIp">
                    <el-input v-model="form.frontIp" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="rearIp">
                    <el-input v-model="form.rearIp" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" @click="dialogVisible = false" type="info"/>
                    <Btn text="保存" @click="submit" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { add, update } from '@/api/system/trans'
import { ref } from 'vue'
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref(null)
const form = ref({
    vehicleCode: '',
    frontIp: '',
    rearIp: '',
    imsiId: '',
})
const rules = ref({

})
const handleClose = () => { 
    formRef.value.resetFields()
}
const submit = async () => { 
    return
    await formRef.value.validate()
    if (form.value.id) await update(form.value) 
    else await add(form.value)
    dialogVisible.value = false
    emit('success')
}

const open = (row = null) => {
    if (row) form.value = {...row}
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>