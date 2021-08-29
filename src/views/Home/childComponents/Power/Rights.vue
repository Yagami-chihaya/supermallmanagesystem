<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      
    </el-breadcrumb>

    <el-card>
      <el-table
        :data="rightsList"
        border
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        
        <el-table-column
          prop="authName"
          label="权限名称"
          >
        </el-table-column>
        <el-table-column
          prop="path"
          label="路径">
        </el-table-column>
        <el-table-column
          
          label="权限等级">
          <template v-slot:='scope'>
            <el-button v-if="scope.row.level==0" type="primary" plain>一级权限</el-button>
            <el-button v-if="scope.row.level==1" type="success" plain>二级权限</el-button>
            <el-button v-if="scope.row.level==2" type="warning" plain>三级权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import {request} from '../../../../network/request'

export default {
  el: '',
  data () {
    return {
      rightsList:[],
    }
  },
  methods: {
    getRightsList(){
      request().get('rights/list').then(res=>{
        
        if(res.data.meta.status!=200){
          return this.$message.error('获取权限列表失败')
        }
        this.rightsList = res.data.data
        console.log(this.rightsList);
      })
    },
    
  },
  created(){
    this.getRightsList()
  }
}
</script>

<style scoped>
  .el-breadcrumb{
    padding-bottom: 15px;
  }

</style>
