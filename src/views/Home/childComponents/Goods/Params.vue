<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
      
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning" :closable='false' show-icon>
      </el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import {request} from '../../../../network/request'

export default {
  el: '',
  data () {
    return {
      categoryList:[]
    }
  },
  methods: {
    getCategoryList(){
      request().get('categories').then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.categoryList = res.data.data
      })
    }
  },
}
</script>

<style scoped>
  .cat_opt{
    margin: 15px 0;
  }
</style>
