<template>
  <div class="login">
    <div class="loginBox">
      <div class="avatarBox">
        <img src="../../assets/logo.png">
      </div>
      
      
      <el-form ref="loginForm" :model='loginForm' :rules='rules' class="formBox">
        <el-form-item prop='username'>
          <el-input prefix-icon="el-icon-user"  v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop='password'>
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" type='password'></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click='preLogin'>登录</el-button>
          <el-button type="info" @click="clearForm">重置</el-button>
        </el-form-item>
        
      </el-form>
    </div>
  </div>
</template>



<script>
import {Edit} from '@element-plus/icons'



export default {
  el: '',
  data () {
    return {
      loginForm:{
        username:'admin',
        password:'123456'
      },
      rules:{
        username:[
          {
            required:true,
            message:"请输入用户名",
            trigger:'blur'
          },
          {
            min: 3,
            max: 8,
            message: '长度在 3 到 8 个字符',
            trigger: 'blur',
          }
        ],
        password:[
          {
            required:true,
            message:"请输入密码",
            trigger:'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          }
        ]
      }
    }
  },
  methods: {
    clearForm(){
      this.$refs.loginForm.resetFields()
    },
    preLogin(){                  
      this.$refs.loginForm.validate(valid=>{
        if(!valid) return valid  //登录预验证
        request().post('/login',this.loginForm).then(res=>{
          
          if(res.data.meta.status!=200){return this.$message.error('error')}
          
          this.$message.success('success')
          console.log(res);
          
          window.sessionStorage.setItem('token',res.data.data.token)
          this.$router.push('/home')
        })

      })
    },
    
  },
  components:{
    Edit
  }
}
</script>

<style scoped>
  .login{
    background: #448fff;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .loginBox{
    position: absolute;
    background: white;
    width: 35%;
    height: 45%;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    border-radius: 3px;
    
  }
  .avatarBox{
    width: 130px;
    height: 130px;
    position: absolute;
    left: 50%;
    background: white;
    transform: translate(-50%,-50%);
    padding: 10px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #ddd;
  }
  .avatarBox img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #eee;
    
  }
  .formBox{
    position: absolute;
    bottom: 0;
    width: 90%;
    height: 100%;
    top: 50%;
    left: 5%;
  }
  .btns{
    position: absolute;
    right: 0;
  }
</style>
