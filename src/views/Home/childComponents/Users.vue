<template>
  <div>
    
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>

      <el-card class="box-card">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-input placeholder="请输入内容" v-model="this.$store.state.queryInfo.query" clearable @clear="getUserData">
              <template #append>
                <el-button icon="el-icon-search" @click="getUserData"></el-button>
              </template>
            </el-input> 
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click='$store.state.isAddDialogVisible = true'>添加用户</el-button>
          </el-col>
        </el-row>

        <el-table :data='$store.state.userData' border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column label="姓名" prop="username" width="200px"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="权限" prop="role_name" width="120px"></el-table-column>
          <el-table-column label="状态" width="80px">
            <template v-slot:='scope'>         <!--vue3中由于slot-scope被v-slot替换，因此在不知道插槽名字的情况下，默认为空-->    
              <el-switch @change="switchToggle(scope.row)" v-model="scope.row.mg_state">   <!--scope.row里包含了该行的所有数据-->
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="250px">
            <template v-slot:='scope'>
              <el-button type="primary" icon="el-icon-edit" @click='showEditUserBox(scope.row.id)'></el-button>
              <el-button type="danger" icon="el-icon-delete" @click="deleteUserData(scope.row.id)"></el-button>
              <el-button type="warning" icon="el-icon-setting" @click="setRoles(scope.row)"></el-button>
            </template>
            
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="$store.state.queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="$store.state.queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="$store.state.total">
        </el-pagination>
      </el-card>

    <add-user-box></add-user-box>
    <edit-user-box :editUserData="editUserData"></edit-user-box>
    <set-roles-box :UserData="UserData"></set-roles-box>

  </div>
</template>

<script>
import {request} from '../../../network/request'
import addUserBox from '../../../components/content/powerComponents/addUserBox.vue'
import setRolesBox from '../../../components/content/powerComponents/SetRolesBox.vue'
import editUserBox from '../../../components/content/powerComponents/EditUserBox.vue'

export default {
  el: '',
  
  data(){
    return{
      editUserData:'',
      UserData:'',

    }
  },
  methods: {
    
    getUserData(){                
      request().get('users',{params:this.$store.state.queryInfo}).then(res=>{
        if(res.data.meta.status!=200){return res.data.meta.msg}
        console.log(res);
        this.$store.state.userData = res.data.data.users;
        console.log(this.$store.state.userData);
        this.$store.state.total = res.data.data.total
      })
    
    },
    
    handleSizeChange(newSize){
      this.$store.state.queryInfo.pagesize = newSize
      this.getUserData()
    },
    handleCurrentChange(newPage){
      this.$store.state.queryInfo.pagenum = newPage
      this.getUserData()
    },
    switchToggle(userinfo){
      console.log(userinfo);
      request().put(`users/${userinfo.id}/state/${userinfo.mg_state}`).then(res=>{console.log(res);})
      
    },
    showEditUserBox(id){
      this.$store.state.isEditDiglogVisible = true
      request().get('users/'+id).then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error = res.data.meta.msg
        }
        this.editUserData = res.data.data
        console.log(res);
      })
      
    },
    deleteUserData(id) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          request().delete('users/'+id).then(res=>{
            if(res.data.meta.status!=200){
              return this.$message.error('删除失败')
            }
            this.getUserData()
          })

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    setRoles(data){
      this.$store.state.isSetRolesDialogVisible = true
      this.UserData = data
    }
    
  },
  created(){
    this.getUserData()
  },
  components:{
    addUserBox,
    editUserBox,
    setRolesBox,
  }
}
</script>

<style scoped>
  .el-pagination{
    margin-top: 15px;
  }
  .el-input{
    padding-bottom: 15px;
  }
</style>
