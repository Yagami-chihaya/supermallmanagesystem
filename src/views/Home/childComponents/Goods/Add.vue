<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable='false'>
      </el-alert>
      <el-steps :space="200" :active="activeIndex" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="addForm" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
      <el-tabs v-model="activeIndex" tab-position="left" :before-leave="beforeLeave" @tab-click="tabClicked">
        <el-tab-pane label="基本信息">
          <el-form-item label='商品名称' prop="goods_name">
            <el-input v-model="addForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label='商品价格' prop="goods_price">
            <el-input v-model="addForm.goods_price" type="number"></el-input>
          </el-form-item>
          <el-form-item label='商品数量' prop="goods_number">
            <el-input v-model="addForm.goods_number" type="number"></el-input>
          </el-form-item>
          <el-form-item label='商品重量' prop="goods_weight">
            <el-input v-model="addForm.goods_weight" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类" prop="goods_cat">
            <el-cascader
              v-model="addForm.goods_cat"
              :options="categoriesList"
              :props="categoriesProps"
              @change="handleChange"
              >
            </el-cascader>
          </el-form-item>
          
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {request} from '../../../../network/request'

export default {
  el: '',
  data () {
    return {
      activeIndex:0,
      addForm:{
        goods_name:'',
        goods_price:0,
        goods_number:0,
        goods_weight:0,
        goods_cat:[],
      },
      rules:{
        goods_name:[
          {required:true,message:'请输入商品名称',trigger:'blur'}
        ],
        goods_price:[
          {required:true,message:'请输入商品价格',trigger:'blur'}
        ],
        goods_number:[
          {required:true,message:'请输入商品数量',trigger:'blur'}
        ],
        goods_weight:[
          {required:true,message:'请输入商品重量',trigger:'blur'}
        ],
        goods_cat:[
          {required:true,message:'请选择分类',trigger:'blur'}
        ]
      },
      categoriesList:[],
      categoriesProps:{
        expandTrigger:'hover',
        label:'cat_name',
        value:'cat_id',
        children:'children'
      },
      manyTableData:[]
    }
  },
  methods: {
    getcategoriesList(){
      request().get('categories').then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error('获取分类失败')
        }
        this.categoriesList = res.data.data
      })
    },
    handleChange(){
      console.log(this.addForm.goods_cat);
      if(this.addForm.goods_cat.length!=3){
        this.addForm.goods_cat = []
      }
    },
    beforeLeave(activeName,oldActiveName){
      console.log(activeName,oldActiveName);
      if(oldActiveName=='0'&&this.addForm.goods_cat.length!=3){
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    tabClicked(){
      if(this.activeIndex==1){
        request().get(`categories/${this.addForm.goods_cat[2]}/attributes`,{params:{sel:'many'}}).then(res=>{
          if(res.data.meta.status!=200){
            return this.$message.error('获取参数失败')
          }
          this.manyTableData = res.data.data
          console.log(this.manyTableData);
        })
      }
    }
  },
  created(){
    this.getcategoriesList()
  }
}
</script>

<style scoped>
  .el-steps{
    margin: 15px auto;
   
  }
</style>
