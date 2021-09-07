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
        <el-tab-pane label="商品参数">
          <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item">
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox :label="item2" v-for="item2 in item.attr_vals" :key="item2" border></el-checkbox>
              
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
  
            :action="uploadUrl"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture"
            :headers="headerObj"
            :on-success="handleSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
            </template>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <QuillEditor v-model:content='addForm.goods_introduce' contentType='text'></QuillEditor>
          <el-button type="primary" style="marginTop:15px" @click='addGoods'>添加商品</el-button>
        </el-tab-pane>
        
      </el-tabs>
      </el-form>
    </el-card>

    <el-dialog
      title="商品预览"
      v-model="isPreviewDialogVisible"
      width="50%"
      
    >
      <img :src="preUrl" style="width:100%">
     
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../../../../network/request'
import _ from 'lodash'

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
        pics:[],
        goods_introduce:'',
        attr:[],
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
      manyTableData:[],
      onlyTableData:[],
      uploadUrl:'https://lianghj.top:8888/api/private/v1/upload',
      headerObj:{
        Authorization:window.sessionStorage.getItem('token')
      },
      preUrl:'',
      isPreviewDialogVisible:false,
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
          res.data.data.forEach(item=>{
            item.attr_vals = item.attr_vals.length===0?[]:item.attr_vals.split(',')
            console.log(item);
          })
          
          this.manyTableData = res.data.data
          console.log(this.manyTableData);
        })
      }else if(this.activeIndex == 2){
        request().get(`categories/${this.addForm.goods_cat[2]}/attributes`,{params:{sel:'only'}}).then(res=>{
          console.log(res);
          if(res.data.meta.status!=200){
            return this.$message.error('获取静态属性失败')
          }
          this.onlyTableData = res.data.data
        })
      }
    },
    handlePreview(res){
      console.log(res);
      this.preUrl = res.url
      this.isPreviewDialogVisible = true
    },
    handleRemove(file){
      console.log(file);
      const filePath = file.response.data.tmp_path
      const i = this.addForm.pics.findIndex(x=>x.pic == filePath)
      this.addForm.pics.splice(i,1)
      console.log(this.addForm.pics);
    },
    handleSuccess(res){
      console.log(res);
      const imgInfo = {
        pic:res.data.tmp_path
      }
      this.addForm.pics.push(imgInfo)
      console.log(this.addForm.pics);
    },
    addGoods(){                   
      console.log(this.addForm);
      this.$refs.ruleForm.validate(valid=>{
        console.log(valid);
        if(!valid){
          return this.$message.error('请正确填写相应信息')
        }
        const newAddForm = _.cloneDeep(this.addForm)      //深拷贝addForm用于把goods_cat从数组修改成字符串
        newAddForm.goods_cat = newAddForm.goods_cat.join(',')  //若直接修改addForm会导致其他请求goods_cat属性的方法报错
        
        this.manyTableData.forEach(item=>{
          
          const newInfo = {
            attr_id:item.attr_id,
            attr_vals:item.attr_vals.join(' ')
          }
          
          this.addForm.attr.push(newInfo)
        })
        this.onlyTableData.forEach(item=>{
          const newInfo = {
            attr_id:item.attr_id,
            attr_vals:item.attr_vals
          }
          this.addForm.attr.push(newInfo)
        })
        newAddForm.attr = this.addForm.attr
       
        console.log(newAddForm);
        request().post('goods',newAddForm).then(res=>{
          console.log(res);
          if(res.data.meta.status!=201){
            this.$message.error(res.data.meta.msg)
          }
          this.getcategoriesList()
          this.$message.success('成功添加商品')
          this.$router.push('/goods')
        })
      })
      
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
