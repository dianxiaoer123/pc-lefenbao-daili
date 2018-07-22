<template>
  <div class="app-container">
  	
  	<div class='inputBox'>
  	<el-form :inline="true" :model="searchData">
  		
  		<div>
  			  <el-form-item label="订单编号" prop="orderId">
           <el-input v-model="searchData.orderId" @keyup.enter.native="getPage"></el-input>
      </el-form-item>
      
       <el-form-item label="保费金额" prop="insuranceMoney">
           <el-input v-model="searchData.insuranceMoney" @keyup.enter.native="getPage"></el-input>
      </el-form-item>
      
      <el-form-item label="投保人" prop="consumerName">
          <el-input v-model="searchData.consumerName" @keyup.enter.native="getPage"></el-input>
      </el-form-item>

       <el-form-item label="保单号" prop="insuranceNo">
          <el-input v-model="searchData.insuranceNo" @keyup.enter.native="getPage"></el-input>
      </el-form-item>
      
  
  		</div>
  		
      
    
      <div>
      	  <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="getPage">查询</el-button>
          </el-form-item>
      
        
      </div>
  
    </el-form>
  		
  	</div>
     
 <el-table
     v-loading="loading"
    :data="tableData"
    highlight-current-row
    style="width: 100%">
    <el-table-column
      type="index"
      label="序号">
    </el-table-column>
    <el-table-column
      property="orderId"
      label="订单编号">
    </el-table-column>
    <el-table-column
      property="orderTime"
      label="订单生成时间">
    </el-table-column>
    <el-table-column
      property="insuranceMoney"
      label="保费金额">
    </el-table-column>
      <el-table-column
      property="consumerName"
      label="投保人">
    </el-table-column>
      <el-table-column
      property="totalPeriod"
      label="总期数">
    </el-table-column>
      <el-table-column
      property="insuranceNo"
      label="保单号">
    </el-table-column>

    <el-table-column
      property="orderMoney"
      label="订单金额">
    </el-table-column>
     
      <el-table-column
      label="操作" width='200'>
      
       <template slot-scope="scope">
         <el-button
          size="mini"
          type="primary"
          v-if='scope.row.appealsStatus == -1'
          @click="appeals(scope.row.orderId)">申诉</el-button>
           <el-button
          size="mini"
          type="primary"
          v-if='scope.row.appealsStatus == 1'
          @click="sendVisile = true">申诉处理中</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="cancel(scope.row.orderId)">取消</el-button>
      </template>
    </el-table-column>
  </el-table>
  
     
  <div class='pageBox'>
       <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 40, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage">
    </el-pagination>

  </div>

<!-- 取消 -->
<el-dialog
  title=""
  :visible.sync="cancelVisile"
  width="30%">
  <div>
      <div class='caslBox'>
         <img src="static/images/cuo.png" alt="">
         <div class='clorder'>取消订单</div>
         <div class="ctip">确认取消{{orderID}}的订单吗？</div>
      </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="cancelVisile = false">取 消</el-button>
    <el-button type="success" @click="sureDelte">确认</el-button>
  </span>
</el-dialog>

<!-- 申诉原因 -->
<el-dialog
  title=""
  :visible.sync="apearVisile"
  width="30%">
  <div>
      <div class='caslBox'>
         <img src="static/images/ss.png" alt="">
         <div class='clorder'>申诉原因</div>
         <div class="apbx">
             <el-radio v-model="radio" label="1">保单已退保</el-radio>
             <el-radio v-model="radio" label="2">保单未交费</el-radio>
         </div>
      </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="apearVisile = false">取 消</el-button>
    <el-button type="success" @click="appealsure">确认</el-button>
  </span>
</el-dialog>

<!-- 提交成功 -->
  <el-dialog
  title=""
  :visible.sync="sendVisile"
  width="30%">
  <div>
      <div class='caslBox'>
         <img src="static/images/right.png" alt="">
         <div class='clorder'>提交成功</div>
         <div class="ctip">您的申诉已经提交，请等待系统处理！</div>
      </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button type="success" @click="sendVisile = false">确认</el-button>
  </span>
</el-dialog>


</div>
</template>

<script>
import mixin from '@/utils/tablemixin.js';

export default {
  name: 'orderlist',
  mixins: [mixin],
  
  data(){
    return{
    
     
     funcName:'OrderList',
     searchData:{
       type:'1',orderId:'',insuranceMoney:'',consumerName:'',insuranceNo:'',failStatus:''
     }
    }
  },



  methods:{
    changeStatus(status,id){
        var obj = {
          status:status==1?2:1,
          id:id
        }
         this.$store.dispatch('AgentUpstatus',obj).then((data) => {
           if(data.code == 200){
             this.getPage();
           }
       })
    },

  }
 
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 .inputBox{
 	 margin-top: 30px;
 	 margin-bottom: 20px;
 }
 .app-container{
 	min-height: 800px;
 }
 .caslBox{
   text-align: center;
 }
 .clorder{
   font-size: 16px;
   text-align: center;
   font-weight: bold;
 }
 .apbx{
   margin-top: 15px;
 }
</style>