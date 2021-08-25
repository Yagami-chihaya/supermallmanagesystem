<template>
  <div class="addUserBox">
    <el-dialog
      title="提示"
      v-model="$store.state.isAddDialogVisible"
      width="50%"
      @close="resetForm('ruleForm')"
      >
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="$store.state.isAddDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
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
      ruleForm:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },
      rules:{
        username:[
          {required:true,message:'请输入用户名称',trigger:'blur'},
          {min:3,max:8,message:'长度在 3 到 8 字符之间',trigger:'blur'}
        ],
        password:[
          {required:true,message:'请输入密码',trigger:'blur'},
          {min:6,max:15,message:'长度在 6 到 15 字符之间',trigger:'blur'}
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
  
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request().post('users',this.ruleForm).then(res=>{
            if(res.data.meta.status != 201){
              return this.$message.error('添加用户失败')
            }
          })
          
          this.$store.state.isAddDialogVisible = false
          this.$message.suceess('成功添加用户')
          
        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
