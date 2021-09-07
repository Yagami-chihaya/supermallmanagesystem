<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="orderList" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="200"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="80"></el-table-column>
        <el-table-column label="是否付款" width="80">
          <template v-slot:='scope'>
            <el-tag type="success" v-if="scope.row.pay_status!=0">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>
        <el-table-column label='下单时间'>
          <template v-slot:='scope'>
            {{time(scope.row.create_time)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template v-slot:='scope'>
            <el-button type="primary" icon="el-icon-edit" @click="showEditAddress"></el-button>
            <el-button type="success" icon="el-icon-location" @click="showProgress"></el-button>
          </template>
          
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      title="修改地址"
      v-model="isEditAddressVisible"
      width="50%"
      @close="clearData"
    >
      <el-form
        :model="addressForm"
        :rules="addressRule"
        ref="addressForm"
        label-width="100px"
        
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader
            v-model="addressForm.address1"
            :options="cityData"
            :props="addressProps"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isEditAddressVisible = false">取 消</el-button>
          <el-button type="primary" @click="isEditAddressVisible = false">确 定</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      title="查看物流"
      v-model="isProgressDialogVisible"
      width="50%"
      
    >
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import {request} from '../../../../network/request'

import cityData from './citydata' //导入本地地址数据

export default {
  el: '',
  data () {
    return {
      queryInfo:{
        query:'',
        pagenum:1,
        pagesize:10
      },
      orderList:[],
      isEditAddressVisible:false,
      addressForm:{
        address1:[],
        address2:''
      },
      addressRule:{
        address1:[
          {required:true,message:'请选择省市区县',trigger:'blur'}
        ],
        address2:[
          {required:true,message:'请输入详细地址',trigger:'blur'}
        ]
      },
      addressProps:{
        expandTrigger: 'hover'
      },
      cityData,
      isProgressDialogVisible:false,
      progressInfo:[],
    }
  },
  methods: {
    getOrdersList(){
      request().get('orders',{params:this.queryInfo}).then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.orderList = res.data.data.goods
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
    handleSizeChange(val){
      this.queryInfo.pagesize = val
      this.getOrdersList()
    },
    handleCurrentChange(val){
      this.queryInfo.pagenum = val
      this.getOrdersList()
    },
    showEditAddress(){
      this.isEditAddressVisible = true
    },
    handleChange(){

    },
    clearData(){
      this.$refs.addressForm.resetFields()
    },
    showProgress(){
      
      request().get(`/kuaidi/1106975712662`).then(res=>{
        console.log(res);
        if(res.data.meta.status!=200){
          return this.$message.error(res.data.meta.msg)
        }
        this.progressInfo = res.data.data
      })

      this.isProgressDialogVisible = true
    }
  },
  
  created(){
    this.getOrdersList()
  }
}
</script>

<style scoped>
  .el-table{
    margin-top: 15px;
  }
  .el-cascader{
    width: 100%;
  }
</style>
