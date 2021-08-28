<template>
  <div>
    <el-dialog
      title="提示"
      v-model="$store.state.isAddRolesBoxDialogVisible"
      width="50%"
      >
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop='roleDesc'>
          <el-input v-model="ruleForm.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$store.state.isAddRolesBoxDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../../network/request'

export default {
  el: '',
  data () {
    return {
      ruleForm:{
        roleName:'',
        roleDesc:''
      },
      rules:{
        roleName:[
          {required:true,message:'输入角色名称',trigger:'blur'},
          {min:2,max:20,message:'长度在 2 到 20 字符',trigger:'blur'}
        ]
      }
    }
  },
  methods: {
    submit(){
      request().post('roles',this.ruleForm).then(res=>{
        if(res.data.meta.status!=201){
          return this.$message.error(res.data.meta.msg)
        }
        this.$message.success(res.data.meta.msg)
        console.log(res.data);
        this.$parent.getRolesList()
      })

      this.$store.state.isAddRolesBoxDialogVisible = false
    }
  },
}
</script>

<style scoped>

</style>
