<template>
  <div>
    <el-dialog 
      title="分配权限"
      v-model="$store.state.isEditRightsBoxVisible"
      width="50%"
      
      >
      
      <el-tree :data="editRightsData" :props="treeProps" show-checkbox node-key='id'
       default-expand-all :default-checked-keys="defKeys" ref="treeRef"
       >
      
      
      </el-tree>
      
      <template #footer>
        <span class="dialog-footer" >
          <el-button @click="$store.state.isEditRightsBoxVisible = false">取 消</el-button>
          <el-button type="primary" @click="summit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../../../network/request'

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
      key:'',
      roleId:'',
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

        this.defKeys = []

    },
    summit(){
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),       //获取选中和半选中的元素id
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      
      
      const idStr = keys.join(',')
      console.log(idStr);
      request().post(`roles/${this.roleId}/rights`,{rids:idStr}).then(res=>{
        
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)

        }
        
        this.$message.success(res.data.meta.msg)
        
        this.defKeys = keys
        this.$parent.getRolesList()
      })
      this.$store.state.isEditRightsBoxVisible = false
    }
    
  },
  updated(){
    
    
    this.key = this.$store.state.defKey
    this.roleId = this.$store.state.defKey.id


    this.clearDefKeys()
    this.getEditRightsData()
    this.getThreeId(this.key,this.defKeys)
    console.log(this.defKeys);
      
  },
  
}
</script>

<style scoped>
  
</style>
