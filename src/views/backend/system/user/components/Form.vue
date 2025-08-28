<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`${form.id ? '编辑' : '新增'}用户`" width="600px" @close="handleClose">
            <el-form ref="formRef" :model="form" label-width="80px" style="margin-top: 2vh;" :rules="rules">
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="用户名" prop="username">
                            <el-input v-model="form.username" :disabled="form.id != null" placeholder="请输入用户名" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="昵称" prop="nickName">
                            <el-input v-model="form.nickName" placeholder="请输入昵称" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="电话" prop="phone">
                            <el-input v-model.number="form.phone" placeholder="请输入电话" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email">
                            <el-input v-model="form.email" placeholder="请输入邮箱" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="性别">
                            <el-radio-group v-model="form.gender">
                                <el-radio value="男" size="small">男</el-radio>
                                <el-radio value="女" size="small">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态">
                            <el-radio-group v-model="form.enabled">
                                <el-radio :value="0" size="small">启用</el-radio>
                                <el-radio :value="1" size="small">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row v-if="!form.id" :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="密码" prop="pass">
                            <el-input v-model="form.pass" type="password" placeholder="请输入密码" show-password />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input v-model="form.checkPass" type="password" placeholder="请确认密码" show-password />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="角色" prop="roles">
                            <el-select v-model="form.roles" multiple placeholder="请选择角色" style="width: 100%"
                                class="select-bay" popper-class="screen_popper">
                                <el-option v-for="item in roleListData" :key="item.id" :label="item.name"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" type="info" @click="dialogVisible = false" />
                    <Btn text="保存" @click="submit" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { add, update, getById } from '@/api/system/user'
import { list as roleList } from '@/api/system/role'
import { ref, onMounted } from 'vue'
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref(null)
const roleListData = ref([])
const defaultForm = {
    id: undefined,
    username: undefined,
    phone: undefined,
    nickName: undefined,
    email: undefined,
    pass: undefined,
    checkPass: undefined,
    deptName: '默认部门',
    userType: 0,
    gender: '男',
    enabled: 0,
    roles: []
}
// 自定义验证规则
const validatePass = (rule, value, callback) => {
    if (form.value.id) {
        callback()
        return
    }
    if (!value) {
        callback(new Error('请输入密码'))
    } else {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
        if (!reg.test(value)) {
            callback(new Error('密码必须是由6-20位字母+数字组合'))
        } else {
            if (form.value.checkPass !== '') {
                formRef.value.validateField('checkPass')
            }
            callback()
        }
    }
}

const validatePass2 = (rule, value, callback) => {
    if (form.value.id) {
        callback()
        return
    }
    if (!value) {
        callback(new Error('请再次输入密码'))
    } else if (value !== form.value.pass) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}

const validatePhone = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入电话号码'))
    } else {
        const reg = /^1[3-9]\d{9}$/
        if (!reg.test(value)) {
            callback(new Error('请输入正确的11位手机号码'))
        } else {
            callback()
        }
    }
}

const form = ref({...defaultForm})

const rules = ref({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
    ],
    nickName: [
        { required: true, message: '请输入用户昵称', trigger: 'blur' },
        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
    ],
    email: [
        { required: true, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
    ],
    phone: [
        { required: true, trigger: 'blur', validator: validatePhone }
    ],
    pass: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
    ],
    checkPass: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        { validator: validatePass2, trigger: 'blur' }
    ],
    roles: [
        { required: true, message: '请选择角色', trigger: 'change' }
    ]
})

onMounted(async () => {
    // 获取角色列表
    const res = await roleList()
    roleListData.value = res.data
})

const handleClose = () => {
    formRef.value.resetFields()
    form.value = {...defaultForm}
}

const submit = async () => {
    await formRef.value.validate()
    // 处理数据
    const data = { ...form.value }
    if (!data.id) {
        delete data.checkPass
    } else {
        if (!data.pass) delete data.pass
        delete data.checkPass
    }

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
    form.value = {...defaultForm}

    if (row) {
        // 编辑时获取用户详情
        const res = await getById(row.id)
        form.value = { ...res.data, pass: undefined, checkPass: undefined }
    }
    dialogVisible.value = true
}

defineExpose({
    open
})
</script>