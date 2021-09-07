<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="main" style="width: 800px;height:420px;"></div>
    </el-card>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {request} from '../../../../network/request'


export default {
  el: '',
  data () {
    return {
      options: {     //用于合并
          title: {
            text: '用户来源'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#E9EEF3'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              boundaryGap: false
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ]
        }
    }
  },
  methods: {
    
  },
  mounted(){

    var myChart = echarts.init(document.getElementById('main'));

    request().get('reports/type/1').then(res=>{
      if(res.data.meta.status!=200){
        return this.$message.error(res.data.meta.msg)
      }

      const newOption = {...this.options,...res.data.data}

      myChart.setOption(newOption);
    })

        
  }
}
</script>

<style scoped>

</style>
