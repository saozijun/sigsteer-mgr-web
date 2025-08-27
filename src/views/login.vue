<template>
    <div class="login-main">
        <div class="logo-wrapper">
            <img src="../assets/logo.png" alt="">
        </div>
        <div class="form-wrapper">
            <h3>业务质量监测系统</h3>
            <el-form ref="ruleFormRef" :model="formData" status-icon :rules="rules" label-width="auto" class="ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="formData.username" :prefix-icon="User" placeholder="账号" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formData.password" :prefix-icon="Lock" type="password" placeholder="密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" style="width: 100%;" @click="submitForm(ruleFormRef)" :loading="loading">
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/login'
import { useUserStore } from "../stores/modules/user";
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
const userStore = useUserStore()
const ruleFormRef = ref()
const rules = ref({
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const router = useRouter()
const loading = ref(false)

const formData = ref({
    username: 'admin',
    password: 'admin',
    userType: 0
})
const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate()
    try {
        loading.value = true
        let res = await login(formData.value)
        loading.value = false
        
        if (res.code === 200) {
            await userStore.login(res.data)
            ElMessage.success('登录成功')
            router.push('/')
        } 
    } catch (error) {
        loading.value = false
    }
}
</script>

<style lang="scss" scoped>
.login-main {
    width: 100vw;
    height: 100vh;
    background: url("@/assets/screen/lg-bg2.jpeg") no-repeat center center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: vw(10);

    h3 {
        font-size: vw(36);
        color: #fff;
        letter-spacing: .2vw;
        margin-bottom: vw(16);
        font-family: "优设标题黑";
        text-shadow: 0 0 vw(10) rgba(255, 255, 255, 0.5);
    }

    .form-wrapper {
        width: vw(400);
        background-color: #000000b9;
        border: vw(2) solid rgba(152, 226, 255, 0.5);
        backdrop-filter: blur(vw(10));
        padding: vw(20) vw(30);
        border-radius: vw(10);
        text-align: center;
        box-shadow: vw(0) vw(0) vw(20) rgba(94, 231, 255, 0.5);
    }

    .logo-wrapper {
        position: absolute;
        top: vw(20);
        left: vw(20);
        width: vw(200);
        img{
            width: 100%;
        }
    }
}
</style>