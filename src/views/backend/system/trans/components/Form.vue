<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`${form.id ? '编辑' : '新增'}车辆与IP绑定`" width="40%" @close="handleClose">
            <el-form ref="formRef" :model="form" label-width="80px" style="margin-top: 2vh;" :rules="rules">
                <el-form-item label="车辆编号" prop="vehicleCode">
                    <el-input v-model="form.vehicleCode" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="车头IP地址" prop="frontIp">
                    <el-input v-model="form.frontIp" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="车尾IP地址" prop="rearIp">
                    <el-input v-model="form.rearIp" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="IMSI号" prop="imsiId">
                    <el-input v-model="form.imsiId" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" @click="dialogVisible = false" type="info" />
                    <Btn text="保存" @click="submit" :loading="loading" />
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
const loading = ref(false)
const form = ref({
    vehicleCode: '',
    frontIp: '',
    rearIp: '',
    imsiId: '',
})
const rules = ref({
    vehicleCode: [{ required: true, message: '请输入车辆编号', trigger: 'blur' }],
    frontIp: [{ required: true, message: '请输入车头IP地址', trigger: 'blur' }],
    rearIp: [{ required: true, message: '请输入车尾IP地址', trigger: 'blur' }],
    imsiId: [{ required: true, message: '请输入IMSI号', trigger: 'blur' }],
})
const handleClose = () => {
    formRef.value.resetFields()
}
const submit = async () => {
    try {
        await formRef.value.validate()
        loading.value = true
        if (form.value.id) await update(form.value)
        else await add(form.value)
        loading.value = false
        dialogVisible.value = false
        emit('success')
    } catch (error) {
        loading.value = false
    }
}

const open = (row = null) => {
    if (row) form.value = { ...row }
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>