<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`${form.id ? '编辑' : '新增'}基站信息`" width="40%" @close="handleClose">
            <el-form ref="formRef" :model="form" label-width="80px" style="margin-top: 2vh;" :rules="rules">
                <el-form-item label="基站信令IP" prop="signalIp">
                    <el-input v-model="form.signalIp" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="基站ENBID" prop="enbId">
                    <el-input v-model="form.enbId" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="基站位置" prop="location">
                    <el-input v-model="form.location" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="form.description" type="textarea" :rows="4" placeholder="请输入"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" @click="dialogVisible = false" type="info"/>
                    <Btn text="保存" @click="submit" :loading="loading"/>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { add, update } from '@/api/system/station'
import { ref } from 'vue'
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref(null)
const loading = ref(false)
const form = ref({
    signalIp: '',
    enbId: '',
    location: '',
    description: '',
})
const rules = ref({
    signalIp: [{ required: true, message: '请输入基站信令IP', trigger: 'blur' }],
    enbId: [{ required: true, message: '请输入基站ENBID', trigger: 'blur' }],
    location: [{ required: true, message: '请输入基站位置', trigger: 'blur' }],
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
    if (row) form.value = {...row}
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>