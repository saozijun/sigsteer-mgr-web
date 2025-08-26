<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`${form.id ? '编辑' : '新增'}角色`" width="520px" @close="handleClose">
            <el-form ref="formRef" :model="form" label-width="80px" style="margin-top: 2vh;" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name" style="width: 380px;" placeholder="请输入角色名称" />
                </el-form-item>
                <el-form-item label="角色编码" prop="code">
                    <el-input v-model="form.code" style="width: 380px;" placeholder="请输入角色编码" />
                </el-form-item>
                <el-form-item label="描述信息" prop="description">
                    <el-input v-model="form.description" style="width: 380px;" rows="5" type="textarea" placeholder="请输入描述信息" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" type="info" @click="dialogVisible = false" color="#949799"/>
                    <Btn text="保存" @click="submit" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { add, update, getById } from '@/api/system/role'
import { ref } from 'vue'
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref(null)

// 自定义验证规则
const isValidRoleCode = (rule, value, callback) => {
    const reg = /[A-Z_]+/
    if (!value) {
        callback(new Error('请输入角色编码'))
    } else if (!reg.test(value)) {
        callback(new Error('角色编码必须大写字母或_组成'))
    } else {
        callback()
    }
}

const form = ref({
    id: undefined,
    name: undefined,
    code: undefined,
    description: undefined
})

const rules = ref({
    name: [
        { required: true, message: '请输入名称', trigger: 'blur' },
        { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
    ],
    code: [
        { required: true, message: '请输入编码', trigger: 'blur' },
        { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' },
        { validator: isValidRoleCode, trigger: 'blur' }
    ],
    description: [
        { required: true, message: '请输入描述信息', trigger: 'blur' }
    ]
})

const handleClose = () => { 
    formRef.value.resetFields()
    form.value = {
        id: undefined,
        name: undefined,
        code: undefined,
        description: undefined
    }
}

const submit = async () => { 
    await formRef.value.validate()
    const data = { ...form.value }
    if (data.id) {
        await update(data) 
    } else {
        await add(data)
    }
    dialogVisible.value = false
    emit('success')
}

const open = async (row = null) => {
    // 重置表单
    form.value = {
        id: undefined,
        name: undefined,
        code: undefined,
        description: undefined
    }
    
    if (row) {
        // 编辑时获取角色详情
        const { data } = await getById(row.id)
        form.value = { ...data }
    }
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>