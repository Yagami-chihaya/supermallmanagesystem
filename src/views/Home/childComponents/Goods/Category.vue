<template>
  <div>
     <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      
    </el-breadcrumb>

    <el-card>
      <el-button type="primary" class="addCartgory" @click="openAddCartgoryBox">添加分类</el-button>
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

    <el-dialog
      title="提示"
      v-model="isAddCategoryVisible"
      width="50%"

      @close="addCategoryClosed"
      >
      <el-form :model="addCategoriesForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCategoriesForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父类分级">
          <el-cascader
            clearable
            
            v-model="selectedKeys"
            :options="parentCategory"
            :props="cascaderProps"
            @change="handleChange"></el-cascader>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAddCategoryVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </template>
    </el-dialog>
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
      total:0,
      isAddCategoryVisible:false,
      rules:{
        cat_name:[
          {required:true,message:'请输入分级名称',trigger:'blur'}
        ]
      },
      addCategoriesForm:{
        cat_name:'',
        cat_pid:0,
        
        cat_level:0,
      },
      parentCategory:[],
      cascaderProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children',
        expandTrigger:'hover',
        checkStrictly:true
      },
      selectedKeys:[],
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
    openAddCartgoryBox(){
      this.getParentCategory()
      this.isAddCategoryVisible = true
    },
    confirm(){  
      console.log(this.addCategoriesForm);
      this.$refs.ruleForm.validate(valid=>{
        if(!valid) return
        request().post('categories',this.addCategoriesForm).then(res=>{
          console.log(res);
          if(res.data.meta.status!=201){
            return this.$message.error(res.data.meta.msg)
          }
          this.getCategoriesData()
          this.$message.success(res.data.meta.msg)
          
        })
        this.isAddCategoryVisible = false
      })
      
    },
    getParentCategory(){
      request().get('categories',{params:{type:2}}).then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.parentCategory = res.data.data
      })
    },
    handleChange(){
      console.log(this.selectedKeys);
      if(!this.selectedKeys){
        this.addCategoriesForm.cat_level = 0
        this.addCategoriesForm.cat_pid = 0
      }else{
      this.addCategoriesForm.cat_level = this.selectedKeys.length
      this.addCategoriesForm.cat_pid = this.selectedKeys[this.selectedKeys.length-1]
      }
    },
    addCategoryClosed(){
      this.$refs.ruleForm.resetFields()
      this.selectedKeys = []
      this.addCategoriesForm.cat_level = 0
      this.addCategoriesForm.cat_pid = 0
    }
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
