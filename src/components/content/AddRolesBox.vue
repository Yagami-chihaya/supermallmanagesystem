<template>
  <div>
    <el-dialog
      title="提示"
      v-model="$store.state.isAddRolesBoxDialogVisible"
      width="50%"
      >
      <span>这是一段信息</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$store.state.isAddRolesBoxDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="$store.state.isAddRolesBoxDialogVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  el: '',
  data () {
    return {
      
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>
