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
        <el-aside width="200px">
          <el-menu
            :uniqueOpened="true"
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template #title>
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="1-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="1-4">
                <template #title>选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <template #title>导航二</template>
            </el-menu-item>
            <el-menu-item index="3" disabled>
              <i class="el-icon-document"></i>
              <template #title>导航三</template>
            </el-menu-item>
            <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <template #title>导航四</template>
            </el-menu-item>
            <el-submenu index="5">
              <template #title>
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <template #title>分组一</template>
                <el-menu-item index="5-1">选项1</el-menu-item>
                <el-menu-item index="5-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="5-3">选项3</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  el: '',
  data () {
    return {
      
    }
  },
  methods: {
    exit(){
      window.sessionStorage.clear()
      this.$router.push('/login')
    }
  },
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
  .el-main{
    background: #eaedf1;
  }
</style>
