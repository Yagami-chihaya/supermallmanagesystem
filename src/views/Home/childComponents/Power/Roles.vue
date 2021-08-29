<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" style="marginBottom:15px"  @click="showAddRolesBox">添加角色</el-button>
        </el-col>
      </el-row>

      <el-table
        :data="rolesList"
        border
        style="width: 100%">
        <el-table-column type="expand">
          <template v-slot:='scope'>
            
            <el-row class="expandRowBox itemCenter"  v-for="item in scope.row.children" :key="item.id">
              <el-col :span="5">
                <el-tag closable @close="removeRightsById(scope.row,item.id)">{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="item1 in item.children" :key="item1.id" class="itemCenter">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightsById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">

                    <el-tag type="warning" v-for="item2 in item1.children" :key="item2.id" closable @close="removeRightsById(scope.row,item2.id)">{{item2.authName}}</el-tag>

                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          >
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="角色描述"
          >
        </el-table-column>
        <el-table-column
          width="360px"
          label="操作">
          <template v-slot:='scope'>
            <el-button  type="primary" icon="el-icon-edit" @click="showEditRolesBox(scope.row)">编辑</el-button>
            <el-button  type="danger" icon="el-icon-delete" @click="deleteRole(scope.row.id)">删除</el-button>
            <el-button  type="warning" icon="el-icon-setting" @click="showEditRightsBox(scope.row)">分配权限</el-button>
          </template>
          
        </el-table-column>
      </el-table>

    </el-card>
    
      <edit-rights-box></edit-rights-box>
      <add-roles-box></add-roles-box>
      <exit-roles-box :roleInfo="roleInfo"></exit-roles-box>
    
    
  </div>
</template>

<script>
import {request} from '../../../../network/request'
import editRightsBox from '../../../../components/content/powerComponents/EditRightsBox.vue'

import exitRolesBox from '../../../../components/content/powerComponents/EditRolesBox.vue'
import addRolesBox from '../../../../components/content/powerComponents/AddRoles.vue'


export default {
  el: '',
  data () {
    return {
      rolesList:[],
      roleInfo:[],
    }
  },
  methods: {
    getRolesList(){
      request().get('roles').then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error('获取角色列表失败')
        }
        this.rolesList = res.data.data
      })
    },
    removeRightsById(role,rightid){
      this.$confirm('此操作会永久删除该权限，是否删除?','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
        request().delete(`roles/${role.id}/rights/${rightid}`).then(res=>{
          if(res.data.meta.status!=200){
            return this.$message.error('删除权限失败')
          }  
          this.$message.success('成功删除此权限')
    
          role.children = res.data.data
          
        })
      }).catch(()=>{
        this.$message('已取消删除')
      })
    },
    showEditRightsBox(data){
      
      this.$store.state.isEditRightsBoxVisible = true
      this.$store.state.defKey = data
      
      console.log(data);
    },
    showAddRolesBox(){
      this.$store.state.isAddRolesBoxDialogVisible = true
      
    },
    showEditRolesBox(data){
      this.roleInfo = data
      this.$store.state.isEditRolesBoxDialogVisible = true
    },
    deleteRole(id){
      request().delete('roles/'+id).then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.$message.success(res.data.meta.msg)
        this.getRolesList()
      })
    }
  },
  created(){
    this.getRolesList()
  },
  components:{
    editRightsBox,
    addRolesBox,
    exitRolesBox,
  }
}
</script>

<style scoped>
  .el-breadcrumb{
    padding-bottom: 15px;
  }
  .el-tag{
    margin:7px;
    
  }
  .expandRowBox{
    border-bottom: 1px solid #eee;
  }
  .expandRowBox:first-child{
    border-top: 1px solid #eee;
  }
  .itemCenter{
    display: flex;
    align-items: center;
  }
</style>
