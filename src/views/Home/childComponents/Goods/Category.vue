<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" class="addCartgory">添加分类</el-button>
      <el-table
        :data="categoriesData"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        border
        lazy
        row-key="cat_id"
        
        style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="cat_name"
          label="商品名称"
          >
        </el-table-column>
        <el-table-column align="center"
          prop="cat_deleted"
          label="是否有效"
          width="100">
          <template v-slot:='scope'>
          <i class="el-icon-success" v-if="!scope.row.cat_deleted"></i>
          </template>
        </el-table-column>
        <el-table-column
          
          width="200px"
          label="排序"
          align="center"
          >
          <template v-slot:='scope'>
            <el-button v-if="scope.row.cat_level==0" type="primary" plain>一级权限</el-button>
            <el-button v-if="scope.row.cat_level==1" type="success" plain>二级权限</el-button>
            <el-button v-if="scope.row.cat_level==2" type="warning" plain>三级权限</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="300px" align="center">
          <el-button type="primary" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete">删除</el-button>
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
import {request} from '../../../../network/request'


export default {
  el: '',
  data () {
    return {
      
      queryInfo:{
        type:3,
        pagenum:1,
        pagesize:5,
      },
      
      categoriesData:[],
      total:0
    }
  },
  methods: {
    getCategoriesData(){
      request().get('categories',{params:this.queryInfo}).then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.categoriesData = res.data.data.result
        
        this.total = res.data.data.total
        this.$message.success(res.data.meta.msg)
      })
    },
    handleSizeChange(newSize){
      this.queryInfo.pagesize = newSize
      this.getCategoriesData()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pagenum = newPage
      this.getCategoriesData()
    },
  },
  created(){
    this.getCategoriesData()
  }
}
</script>

<style scoped>
  .addCartgory{
    margin-bottom: 15px;
  }
  
</style>
