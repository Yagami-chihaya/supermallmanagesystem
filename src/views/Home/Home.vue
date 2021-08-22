<template>
  <div class="home">
    <el-button type="primary" @click='exit'>退出</el-button>
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

</style>
