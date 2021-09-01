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

        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled='isBtnVisible' style="marginBottom:15px" @click="showAddParamsDialog">添加参数</el-button>
          <el-table :data="manyTabData" border stripe >
            <el-table-column type="expand">
              <template v-slot:='scope'>
                <el-tag
                  v-for="(item,index) in scope.row.attr_vals"
                  :key="index"
                  closable
                  @close="tagClose(index)"
                  >
                  {{item}}
                </el-tag>
                <el-input 
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  
                  ref="saveTagInput"
                  size="mini"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>  
              </template>
              
            </el-table-column>
            <el-table-column type='index'></el-table-column>
            <el-table-column label="参数名称" prop="attr_name" ></el-table-column>
            <el-table-column label="操作">
              <template v-slot:='scope'>
                <el-button type="warning" icon="el-icon-edit" @click="showEditParamsDialog(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteEditParam(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">

          <el-button type="primary" size="mini" :disabled='isBtnVisible' style="marginBottom:15px" @click="showAddParamsDialog">添加属性</el-button>
          <el-table :data="onlyTabData" border stripe >
            <el-table-column type="expand">
              <template v-slot:='scope'>  
                <el-tag
                  v-for="(item,index) in scope.row.vals_arrs"
                  :key="index"
                  closable
                  @close="tagClose(index)"
                  >       
                </el-tag>    
                <el-input 
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="mini"
                  
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>        
              </template>
              
            </el-table-column>
            <el-table-column type='index'></el-table-column>
            <el-table-column label="属性名称" prop="attr_name" ></el-table-column>
            <el-table-column label="操作">
              <template v-slot:='scope'>
                <el-button type="warning" icon="el-icon-edit" @click="showEditParamsDialog(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="deleteEditParam(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <el-dialog
      :title="titleText"
      v-model="isAddParamsDialogVisible"
      width="50%"
      @close="addDialogClosed"
      >
      <el-form :model="addParamsData" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="addParamsData.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isAddParamsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      :title="titleText"
      v-model="isEditParamsDialogVisible"
      width="50%"
      @close="editDialogClosed"
      >
      <el-form :model="editParamsData" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editParamsData.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isEditParamsDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editParams" >确 定</el-button>
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
      categoryList:[],
      cascaderProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children',
        expandTrigger:'hover',
        
      },
      selectedKeys:[],
      activeName:'many',
      
      manyTabData:[],
      onlyTabData:[],
      isAddParamsDialogVisible:false,
      addParamsData:{
        attr_name:''
      },
      rules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' },
        ],
      },
      isEditParamsDialogVisible:false,
      editParamsData:{
        attr_name:'',
        attr_id:''
      },
      inputVisible:false,
      inputValue:''
      
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

      this.getParamsData()
    },
    handleTagClick(){
      console.log(this.activeName);
      
      this.getParamsData()
    },
    getParamsData(){
      request().get(`categories/${this.cateId}/attributes`,{params:{sel:this.activeName}}).then(res=>{
        console.log(res);
        if(res.data.meta.status != 200){
          return this.$message.error(res.data.meta.msg)
        }
        this.$message.success(res.data.meta.msg)
        res.data.data.forEach(item => {
          
          item.attr_vals = item.attr_vals? item.attr_vals.split(',') : []
          
        });
        if(this.activeName == 'many'){
          this.manyTabData = res.data.data
        }else {
          this.onlyTabData = res.data.data
        }
      })
    },
    showAddParamsDialog(){
      this.isAddParamsDialogVisible = true
    },
    submit(){
      this.$refs.ruleForm.validate(valid=>{
        if(!valid) return
        request().post(`categories/${this.cateId}/attributes`,{attr_name:this.addParamsData.attr_name,attr_sel:this.activeName}).then(res=>{
          
          if(res.data.meta.status!=201){
            return this.$message.error(res.data.meta.msg)
          }
          this.$message.success(res.data.meta.msg)
          this.getParamsData()
        })
      })
      
      this.isAddParamsDialogVisible = false
    },
    addDialogClosed(){
      this.$refs.ruleForm.resetFields()
    },
    editDialogClosed(){
      this.$refs.editForm.resetFields()
    },
    showEditParamsDialog(attr){
      this.isEditParamsDialogVisible =  true
      this.editParamsData.attr_name = attr.attr_name
      this.editParamsData.attr_id = attr.attr_id
      
      console.log(attr);
      
    },
    editParams(){
      this.$refs.editForm.validate(valid=>{
        if(!valid) return
          request().put(`categories/${this.cateId}/attributes/${this.editParamsData.attr_id}`,{attr_name:this.editParamsData.attr_name,attr_sel:this.activeName}).then(res=>{
          if(res.data.meta.status!=200){
            return this.$message.error(res.data.meta.msg)
          }
          this.getParamsData()
        })
      })
      
      this.isEditParamsDialogVisible = false
    },
    deleteEditParam(attr){
      request().delete(`categories/${this.cateId}/attributes/${attr.attr_id}`).then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.getParamsData()
      })
    },
    tagClose(index){
      
    },
    handleInputConfirm(){

    },
    showInput(){
      this.inputVisible = true
    }

  },
  computed:{
    isBtnVisible(){
      if(this.selectedKeys.length!=3){
        return true
      }
      return false 
    },
    cateId(){
      if(this.selectedKeys.length==3){
        
        return this.selectedKeys[2]
        
      }
      else return null

    },
    titleText(){
      if(this.activeName == 'many'){
        return '修改动态参数'
      }else {
        return '修改静态属性'
      }
    },
    
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
  .el-tag{
    margin: 15px;
  }
  .input-new-tag{
    width: 150px;
  }
</style>
