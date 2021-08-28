<template>
  <div>
    <el-dialog
      title="提示"
      v-model="$store.state.isEditRolesBoxDialogVisible"
      width="50%"
      >
      <p>{{roleInfo}}</p>
      <el-form ref="roleInfo" :model="roleInfo" :rules="rules" label-width="80px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="roleInfo.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop='roleDesc'>
          <el-input v-model="roleInfo.roleDesc"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$store.state.isEditRolesBoxDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sumbit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { request } from '../../network/request'
export default {
  el: '',
  data () {
    return {
      
      rules:{
        roleName:[
          {required:true,message:'输入角色名称',trigger:'blur'},
          {min:2,max:20,message:'长度在 2 到 20 字符',trigger:'blur'}
        ]
      }
    }
  },
  props:{
    roleInfo:[]
  },
  methods: {
    sumbit(){
      request().put(`roles/${this.roleInfo.id}`,{roleName:this.roleInfo.roleName,roleDesc:this.roleInfo.roleDesc}).then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        console.log(res.data.data);
        this.$message.success(res.data.meta.msg)
      })
      this.$store.state.isEditRolesBoxDialogVisible = false
    }
  },
}
</script>

<style scoped>

</style>
