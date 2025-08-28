<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`${form.id ? '编辑' : '新增'}菜单`" width="600px" top="8vh"
            @close="handleClose">
            <el-form ref="formRef" :model="form" label-width="4.5vw" style="margin-top: 2vh;" :rules="rules">
                <el-form-item label="菜单类型" prop="type">
                    <el-radio-group v-model="form.type" size="mini" style="width: 178px">
                        <el-radio-button label="目录" :value="0" />
                        <el-radio-button label="菜单" :value="1" />
                        <el-radio-button label="按钮" :value="2" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="上级节点" prop="pid">
                    <el-tree-select v-model="form.pid" :data="menus" check-strictly
                        :props="{ value: 'id', label: 'label', children: 'children' }" placeholder="选择上级"
                        style="width: 450px;" popper-class="screen_popper"></el-tree-select>
                </el-form-item>
                <el-form-item v-if="form.type.toString() !== '2'" label="菜单图标" prop="icon">
                    <el-popover placement="bottom-start" :width="540" trigger="click" popper-class="screen_popper">
                        <template #reference>
                            <el-input v-model="form.icon" placeholder="点击选择图标" @blur="showSelectIcon" readonly clearable>
                                <template #prefix>
                                    <svg-icon v-if="form.icon" :icon-class="form.icon" class="el-input__icon"
                                        style="height: 32px;width: 16px;" />
                                    <el-icon v-else style="height: 32px;width: 16px;">
                                        <search />
                                    </el-icon>
                                </template>
                                <template #suffix>
                                    <el-icon @click="form.icon = ''"  v-if="form.icon" class="close-icon">
                                        <CircleClose />
                                    </el-icon>
                                </template>
                            </el-input>
                        </template>
                        <icon-select ref="iconSelectRef" @selected="selected" :active-icon="form.icon" />
                    </el-popover>
                </el-form-item>
                <!-- <el-form-item v-if="form.type.toString() !== '2'" label="外链菜单" prop="iframe">
                    <el-radio-group v-model="form.iframe" size="mini">
                        <el-radio-button label="是" :value="true" />
                        <el-radio-button label="否" :value="false" />
                    </el-radio-group>
                </el-form-item> -->
                <!-- <el-form-item v-if="form.type.toString() === '1'" label="菜单缓存" prop="cache">
                    <el-radio-group v-model="form.cache" size="mini">
                        <el-radio-button label="是" :value="true" />
                        <el-radio-button label="否" :value="false" />
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item v-if="form.type.toString() !== '2'" label="菜单可见" prop="hidden">
                    <el-radio-group v-model="form.hidden" size="mini">
                        <el-radio-button label="是" :value="false" />
                        <el-radio-button label="否" :value="true" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item v-if="form.type.toString() !== '2'" label="菜单标题" prop="title">
                    <el-input v-model="form.title"
                        :style="form.type.toString() === '0' ? 'width: 450px' : 'width: 178px'" placeholder="菜单标题" />
                </el-form-item>
                <el-form-item v-if="form.type.toString() === '2'" label="按钮名称" prop="title">
                    <el-input v-model="form.title" placeholder="按钮名称" style="width: 178px;" />
                </el-form-item>
                <el-form-item v-if="form.type.toString() !== '0'" label="权限标识" prop="permission">
                    <el-input v-model="form.permission" :disabled="form.iframe === true" placeholder="权限标识"
                        style="width: 178px;" />
                </el-form-item>
                <el-form-item v-if="form.type.toString() !== '2'" label="路由地址" prop="path">
                    <el-input v-model="form.path" placeholder="路由地址" style="width: 178px;" />
                </el-form-item>
                <el-form-item label="菜单排序" prop="sort">
                    <el-input-number v-model.number="form.sort" :step="10" :min="0" :max="1000"
                        controls-position="right" style="width: 178px;" />
                </el-form-item>
                <el-form-item v-if="form.iframe !== true && form.type.toString() !== '2'" label="组件名称" prop="name">
                    <el-input v-model="form.name"
                        :style="form.type.toString() === '0' ? 'width: 450px' : 'width: 178px'"
                        placeholder="匹配组件内Name字段" />
                </el-form-item>
                <el-form-item v-if="form.iframe !== true && form.type.toString() === '1'" label="组件路径" prop="component">
                    <el-input v-model="form.component" style="width: 178px;" placeholder="组件路径" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" @click="dialogVisible = false" type="info" />
                    <Btn text="保存" @click="submit" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { add, update, getMenu, treeList } from '@/api/system/menu'
import { ref, onMounted } from 'vue'
import SvgIcon from "@/components/SvgIcon/index.vue"
import IconSelect from "@/components/IconSelect/index.vue"
const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref(null)
const menus = ref([])
const defaultForm = {
    id: null,
    title: null,
    name: null,
    sort: 1000,
    path: null,
    component: null,
    iframe: false,
    pid: "0",
    icon: null,
    cache: false,
    hidden: false,
    type: 0,
    permission: null
}
// 表单数据
const form = ref({...defaultForm})

// 验证规则
const rules = ref({
    title: [
        { required: true, message: '请输入标题', trigger: 'blur' }
    ],
    path: [
        { required: true, message: '请输入地址', trigger: 'blur' }
    ],
    name: [
        { required: true, message: '请输入组件名称', trigger: 'blur' }
    ],
    component: [
        { required: true, message: '请输入组件路径', trigger: 'blur' }
    ]
})
// 获取菜单树
const getMenus = async () => {
    const { data } = await treeList()
    const children = data
    menus.value = [{ id: "0", label: '顶级节点', children: children }]
}

const handleClose = () => {
    formRef.value.resetFields()
    form.value = {...defaultForm}
}

const submit = async () => {
    await formRef.value.validate()
    const data = { ...form.value }
    data.menuCategory = 0
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
    getMenus()
    if (row) {
        // 编辑时获取菜单详情
        const { data } = await getMenu(row.id)
        form.value = { ...data }
    }
    dialogVisible.value = true
}

/** 选择图标 */
const selected = (name) => {
  form.value.icon = name
}

defineExpose({
    open
})
</script>

<style lang="scss" scoped>
.close-icon {
    cursor: pointer;
    &:hover {
        color: #378eff;
    }
}
</style>