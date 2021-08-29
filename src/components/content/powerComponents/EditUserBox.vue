<template>
  <div>
    <el-dialog
      title="更改用户信息"
      @close="resetForm('ruleForm')"
      v-model="$store.state.isEditDiglogVisible"
      width="50%"
      
      >
      <el-form :model="editUserData" :rules="rules" ref="ruleForm" label-width="70px">
        <el-form-item label="用户名" prop="username" >
          <el-input v-model="editUserData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="editUserData.mobile"></el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$store.state.isEditDiglogVisible = false" >取 消</el-button>
          <el-button type="primary" @click="confirm('ruleForm')">确 定</el-button>
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
    let checkEmail=(rule,value,callback)=>{
      const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if(reg.test(value)){
        return callback()
      } 
      callback(new Error('请输入合法的邮箱'))
    }
    let checkMobile=(rule,value,callback)=>{
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

      if(reg.test(value)){
        return callback()
      } 
      callback(new Error('请输入合法的手机号'))
    }
    return {
      
      rules:{
        username:[
          {required:true,message:'请输入用户名称',trigger:'blur'},
          {min:3,max:8,message:'长度在 3 到 8 字符之间',trigger:'blur'}
        ],
        
        email:[
          {required:true,message:'请输入邮箱',trigger:'blur'},
          {validator:checkEmail,trigger:'blur'}
        ],
        mobile:[
          {required:true,message:'请输入手机号',trigger:'blur'},
          {validator:checkMobile,trigger:'blur'}
        ],
      },
    }
  },
  props:{
    editUserData:{
      default:''
    }
  },
  methods: {
    confirm(refname){
      this.$refs[refname].validate((valid)=>{
        if(valid){
          request().put('users/'+this.editUserData.id,{email:this.editUserData.email,mobile:this.editUserData.mobile}).then(res=>{
            if(res.data.meta.status!=200){
              return this.$message.error(res.data.meta.msg);
            }
            console.log(res);
            
            this.$store.state.isEditDiglogVisible = false
            this.$message.success('成功修改用户')
          })
        }else {
          console.log('error submit');
          return false
        }
      })
      request().get('users',{params:this.$store.state.queryInfo}).then(res=>{
        if(res.data.meta.status!=200){return res.data.meta.msg}
        console.log(res);
        this.$store.state.userData = res.data.data.users;
        console.log(this.userData);
        this.$store.state.total = res.data.data.total
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }    
  },
  
  
}
</script>

<style scoped>

</style>
