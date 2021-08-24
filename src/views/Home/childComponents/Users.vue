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
            <el-input placeholder="请输入内容">
              <template #append>
                <el-button icon="el-icon-search"></el-button>
              </template>
            </el-input> 
          </el-col>
          <el-col :span="4">
            <el-button type="primary">添加用户</el-button>
          </el-col>
        </el-row>

        <el-table :data='userData' border stripe>
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
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="danger" icon="el-icon-delete"></el-button>
            <el-button type="warning" icon="el-icon-setting"></el-button>
          </el-table-column>
        </el-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>

      
    
  </div>
</template>

<script>

import {request} from '../../../network/request'


export default {
  el: '',
  data () {
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:2,
      },
      userData:'',
      total:0,
    }
  },
  methods: {
    getUserData(){
      request().get('users',{params:this.queryInfo}).then(res=>{
        if(res.data.meta.status!=200){return res.data.meta.msg}
        console.log(res);
        this.userData = res.data.data.users;
        console.log(this.userData);
        this.total = res.data.data.total
      })
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
    },
    switchToggle(userinfo){
      console.log(userinfo);
      request().put(`users/${userinfo.id}/state/${userinfo.mg_state}`).then(res=>{console.log(res);})
      
    }
    
  },
  created(){
    this.getUserData()
  }
}
</script>

<style scoped>
  .el-pagination{
    margin-top: 15px;
  }
</style>
