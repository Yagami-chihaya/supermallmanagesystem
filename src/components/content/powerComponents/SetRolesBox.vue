<template>
  <div>
    <el-dialog
      title="提示"
      v-model="$store.state.isSetRolesDialogVisible"
      width="50%"
      >
      <p>当前的用户:{{UserData.username}}</p>
      <p>当前的角色:{{UserData.role_name}}</p>
      
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in allRolesData"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$store.state.isSetRolesDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../../../network/request'

export default {
  el: '',
  data () {
    return {
      allRolesData:'',
      selectedRoleId:''
    }
  },
  props:{
    UserData:''
  },
  methods: {
    getAllRolesData(){
      request().get('roles').then(res=>{
        if(res.data.meta.status != 200){
          return this.$message.error('请求数据失败')
        }
        this.allRolesData = res.data.data
        this.$message.success('请求数据成功')
      })
    },
    submit(){
      request().put(`users/${this.UserData.id}/role`,{rid:this.selectedRoleId}).then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.$message.success('成功修改用户角色')
        this.$parent.getUserData()
      })
      this.$store.state.isSetRolesDialogVisible = false
    }
  },
  created(){
    this.getAllRolesData()
  }
}
</script>

<style scoped>

</style>
