<template>
  <div>
    <el-dialog 
      title="分配权限"
      v-model="$store.state.isEditRightsBoxVisible"
      width="50%"
      @close="clearDefKeys"
      >
      <el-tree :data="editRightsData" :props="treeProps" show-checkbox node-key='id'
       default-expand-all :default-checked-keys="defKeys"
       >
      
      
      </el-tree>
      
      <template #footer>
        <span class="dialog-footer" >
          <el-button @click="$store.state.isEditRightsBoxVisible = false">取 消</el-button>
          <el-button type="primary" @click="$store.state.isEditRightsBoxVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../../network/request'

export default {
  el: '',
  data () {
    return {
      editRightsData:'',
      treeProps:{
        label:'authName',
        children:'children'
      },
      defKeys:[],
    }
  },
  props:{
    defKey:'',
  },
  watch:{
    defKey:function(newData){
      
      this.getThreeId(newData,this.defKeys)
      
    }
  },
  methods: {
    getEditRightsData(){
      request().get('rights/tree').then(res=>{
        if(res.data.meta.status!=200){
          return this.$message.error('获取分配权限数据失败')
        }
        this.editRightsData = res.data.data
        console.log(res.data.data);
      })
    },
    getThreeId(node,arr){
      
      
      if(!node.children){
        
        
        return arr.push(node.id)
        
      }
      node.children.forEach(item => {
        this.getThreeId(item,arr)
      });
      
    },
    clearDefKeys(){
      console.log(this.defKeys);
      this.defKeys = []
      
    }
    
  },
  updated(){
    
    
    this.getEditRightsData()
    
    
  },
  
}
</script>

<style scoped>
  
</style>
