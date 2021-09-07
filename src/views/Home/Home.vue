<template>
  <div class="home">
    
    <el-container class="home-content">
      
      <el-header>
        <div class="left">
          <img src="../../assets/img/电商.png">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="primary" @click='exit'>退出</el-button>
      </el-header>

      <el-container>
        <el-aside :width="isToggleCollapse?'64px':'200px'">
          <div class="toggleButton" @click="toggleCollapse">|||</div>
          <el-menu
            :uniqueOpened="true"
            :default-active="activePage"
            class="el-menu-vertical-demo"
            
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409BFF"
            :collapse='isToggleCollapse'
            :collapse-transition='false'
            :router='true'
            
            >
            <el-submenu :index="item.id+''" v-for="item in leftMenuData" :key="item">
              <template #title>
                <i :class="iconList[item.id]"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="'/'+i.path" v-for="i in item.children" :key="i" @click="saveActivePage(i.path)">
                <i class="el-icon-menu"></i>
                <span>{{i.authName}}</span>
                
              </el-menu-item>
              
            </el-submenu>
            
          </el-menu>
        </el-aside>
        <el-main>
          <router-view>
            
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {request} from '../../network/request.js'



export default {
  el: '',
  data () {
    return {
      leftMenuData:'',
      iconList:{
        125:'el-icon-user-solid',
        103:'el-icon-s-promotion',
        101:'el-icon-s-shop',
        102:'el-icon-s-order',
        145:'el-icon-s-platform'
      },
      isToggleCollapse:true,
      activePage:''
    }
  },
  methods: {
    exit(){
      
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    getLeftMenu(){
      request().get('/menus').then(res=>{
        if(res.data.meta.status !=200){return this.$message.error(res.data.meta.msg)}
        this.leftMenuData = res.data.data
        console.log(res);
      })
    },
    toggleCollapse(){
      this.isToggleCollapse = !this.isToggleCollapse
    },
    saveActivePage(path){
      this.activePage = path
    }
  },
  components:{
    
    
  },
  created(){
    this.getLeftMenu()
  }
}
</script>

<style scoped>
  .home-content{
    height: 100vh;
  }
  .el-header{
    background: #373d41;
    display: flex;
    justify-content:space-between;
    align-items: center;
  }
  .el-header .left{
    width: 30%;
    height: 90%;
  }
  .el-header .left>img{
    height: 100%;
    vertical-align: middle;
  }
  .el-header .left>span{
    margin-left: 15px;
    font-size: 1.5rem;
    vertical-align: middle;
    color: white;
  }
  .el-aside{
    background: #333744;
    
  }
  .el-aside .el-menu{
    border-right: none;
  }
  .el-main{
    background: #eaedf1;
  }
  .toggleButton{
    background: #4A5064;
    color: white;
    font-size: 10px;
    line-height: 24px;
    text-align: center;
    cursor: pointer;
    letter-spacing: 0.2rem;
  }
</style>
