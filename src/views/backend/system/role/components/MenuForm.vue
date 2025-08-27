<template>
    <div>
        <el-dialog v-model="dialogVisible" :title="`角色菜单权限`" top="8vh" width="620px"
            @close="handleClose">
            <el-form ref="formRef" :model="form" label-width="4.5vw" style="margin-top: 2vh;" :rules="rules">
                <el-form-item label="角色名称">
                    <el-input v-model="roleName" disabled />
                </el-form-item>
                <el-form-item label="菜单权限">
                    <div class="checkbox-group">
                        <el-checkbox v-model="isOpen" label="展开/折叠" />
                        <el-checkbox v-model="isSelected" label="全选/全不选" />
                    </div>
                    <el-tree style="width: 100%;" ref="treeRef" :data="menuTree" :props="defaultProps" show-checkbox
                        node-key="id" :default-checked-keys="form.menuIds" :default-expand-all="isOpen" :key="treeKey" highlight-current />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <Btn text="取消" type="info" @click="dialogVisible = false" />
                    <Btn text="保存" @click="submit" :loading="submitting" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { getById } from '@/api/system/role'
import { treeList, saveMenu } from '@/api/system/menu'
import { ref, onMounted, nextTick, watch } from 'vue'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['success'])
const dialogVisible = ref(false)
const formRef = ref(null)
const treeRef = ref(null)
const menuTree = ref([])
const roleName = ref('')
const loading = ref(false)
const submitting = ref(false)
const isOpen = ref(false)
const isSelected = ref(false)
const treeKey = ref(0)

const form = ref({
    menuIds: [],
    id: undefined
})

const rules = ref({
    // menuIds: [
    //     { required: true, message: '请选择菜单权限', trigger: 'change' }
    // ]
})

const defaultProps = {
    children: 'children',
    label: 'label'
}

// 获取菜单树
const getMenuTree = async () => {
    loading.value = true
    try {
        const { data } = await treeList()
        menuTree.value = data || []
    } catch (error) {
        menuTree.value = []
    } finally {
        loading.value = false
    }
}

const handleClose = () => {
    formRef.value.resetFields()
    form.value = {
        menuIds: [],
        id: undefined
    }
    roleName.value = ''
}

const submit = async () => {
    await formRef.value.validate()

    // 获取选中的菜单ID
    const checkedKeys = treeRef.value.getCheckedKeys()
    const halfCheckedKeys = treeRef.value.getHalfCheckedKeys()
    const allMenuIds = [...checkedKeys, ...halfCheckedKeys]
    if (allMenuIds.length === 0) {
        ElMessage.warning('请至少选择一个菜单权限')
        return
    }

    submitting.value = true
    try {
        await saveMenu(form.value.id, allMenuIds)
        ElMessage.success('保存成功')
        dialogVisible.value = false
        emit('success')
    } catch (error) {} finally {
        submitting.value = false
    }
}

const open = async (row = null) => {
    // 重置表单
    form.value = {
        menuIds: [],
        id: undefined
    }
    roleName.value = ''

    if (row) {
        roleName.value = row.name
        const { data } = await getById(row.id)
        form.value = {
            id: data.id,
            menuIds: data.menuList || []
        }
    }
    dialogVisible.value = true
    // 如果返回包含父级菜单ID，避免默认联动选中所有子菜单
    await nextTick()
    if (treeRef.value) {
        // 清空默认选中，逐个设置为非递归选中（不联动子节点）
        treeRef.value.setCheckedKeys([])
            ; (form.value.menuIds || []).forEach((id) => {
                treeRef.value.setChecked(id, true, false)
            })
    }
}

// 递归收集全部节点ID
const collectAllIds = (nodes) => {
    const ids = []
    const stack = Array.isArray(nodes) ? [...nodes] : []
    while (stack.length) {
        const node = stack.pop()
        if (!node) continue
        if (node.id !== undefined && node.id !== null) ids.push(node.id)
        if (node.children && node.children.length) stack.push(...node.children)
    }
    return ids
}

// 展开/折叠：通过改变key触发树重渲染，并使用default-expand-all
watch(isOpen, async () => {
    treeKey.value += 1
    await nextTick()
    // 保持当前已选状态（Element会保留内部状态，但我们保险起见重设）
    if (treeRef.value) {
        const checked = treeRef.value.getCheckedKeys()
        const half = treeRef.value.getHalfCheckedKeys()
        const keep = [...new Set([...checked, ...half])]
        treeRef.value.setCheckedKeys([])
        keep.forEach((id) => treeRef.value.setChecked(id, true, false))
    }
})

// 全选/全不选
watch(isSelected, (val) => {
    if (!treeRef.value) return
    if (val) {
        const all = collectAllIds(menuTree.value)
        treeRef.value.setCheckedKeys(all)
    } else {
        treeRef.value.setCheckedKeys([])
    }
})

onMounted(() => {
    getMenuTree()
})

defineExpose({
    open
})
</script>

<style lang="scss" scoped>

:deep(.el-tree) {
    padding: vw(10);
    .el-tree-node__content {
        height: vw(38);
    }
}

.checkbox-group {
    display: flex;
    align-items: center;
    margin-top: vw(4);
}
</style>