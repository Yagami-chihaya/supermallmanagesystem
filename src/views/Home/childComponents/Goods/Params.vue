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
          <el-cascader
            v-model="selectedKeys"
            :options="categoryList"
            :props="cascaderProps"
            @change="handleChange">
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleTagClick">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" size="mini" :disabled='isBtnVisible'>添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="second">
          <el-button type="primary" size="mini" :disabled='isBtnVisible'>添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import {request} from '../../../../network/request'

export default {
  el: '',
  data () {
    return {
      categoryList:[],
      cascaderProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children',
        expandTrigger:'hover',
        
      },
      selectedKeys:[],
      activeName:'first'
    }
  },
  methods: {
    getCategoryList(){
      request().get('categories').then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.categoryList = res.data.data
      })
    },
    handleChange(){
      console.log(this.selectedKeys);
     
    },
  },
  computed:{
    isBtnVisible(){
      if(this.selectedKeys.length!=3){
        return true
      }
      return false 
    }
  },
  created(){
    this.getCategoryList()
  }
  
}
</script>

<style scoped>
  .cat_opt{
    margin: 15px 0;
  }
</style>
