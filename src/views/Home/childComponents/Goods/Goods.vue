<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20" style='marginBottom:15px'>
        <el-col :span="8">
          <el-input
            placeholder="请输入内容"
            v-model="queryInfo.query"
            clearable
            @clear="getGoodsList"
          >
            
            <template #append>
              <el-button icon="el-icon-search" @click="search"></el-button>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary" @click="addGoods">添加商品</el-button></el-col>
      </el-row>
      <el-table :data="goodsList" border stripe style='marginBottom:15px'>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column label="商品价格" width="95px" prop="goods_price"></el-table-column>
        <el-table-column label="商品重量" width="95px" prop="goods_weight"></el-table-column>
        <el-table-column label="创建时间" width="140px">
          <template v-slot:='scope'>
            {{time(scope.row.add_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px">
          <template v-slot:='scope'>
            <el-button type='warning' icon="el-icon-edit">编辑</el-button>
            <el-button type='danger' icon="el-icon-delete" @click="deleteGoods(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[1, 2, 5, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </el-card>

    
  </div>
</template>

<script>
import {request} from '../../../../network/request'
export default {
  el: '',
  data () {
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      goodsList:[],
      total:0,
      isAddGoodsVisible:false,
    }
  },
  methods: {
    getGoodsList(){
      request().get('goods',{params:this.queryInfo}).then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error('请求商品列表失败')
        }
        this.goodsList = res.data.data.goods
        this.total = res.data.data.total
      })
    },
    time(timestamp){
      const dt = new Date(timestamp)
      const y = dt.getFullYear()
      const m = (dt.getMonth()+1+'').padStart(2,'0')
      const d = (dt.getDate()+'').padStart(2,'0')
      const hh = (dt.getHours()+'').padStart(2,'0')
      const mm = (dt.getMinutes()+'').padStart(2,'0')
      const ss = (dt.getSeconds()+'').padStart(2,'0')
      return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    },
    handleSizeChange(pagesize){
      this.queryInfo.pagesize = pagesize 
      this.getGoodsList()
    },
    handleCurrentChange(pagenum){
      this.queryInfo.pagenum = pagenum
      this.getGoodsList()
    },
    addGoods(){
      this.$router.push('/goods/add')
    },
    search(){
      this.getGoodsList()
    },
    deleteGoods(row){
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          request().delete(`goods/${row.goods_id}`).then(res=>{
            if(res.data.meta.status!=200){
              return this.$message.error('删除商品失败')
            }
            this.getGoodsList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
      });
      
    }
  },
  computed:{
    
  },
  created(){
    this.getGoodsList()
  }
}
</script>

<style scoped>

</style>
