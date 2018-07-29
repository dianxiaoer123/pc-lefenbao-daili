<template>
<div class="app-container">
  	<el-form label-width="120px" :model="orderList"  :rules="rules" ref="orderList">
      <el-form-item label="保险公司" prop="insuranceId">
         <el-select v-model="orderList.insuranceId" placeholder="请选择">
            <el-option label='请选择' value=''></el-option>
            <el-option
              v-for="item in orderForm.companyVos"
             :key="item.id"
             :label="item.name"
             :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
       <el-form-item label="保险产品" prop="productId">
         <el-select v-model="orderList.productId" placeholder="请选择">
            <el-option label='请选择' value=''></el-option>
            <el-option
              v-for="item in productVoList"
             :key="item.id"
             :label="item.name"
             :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="分期期数" prop="periodId">
         <el-select v-model="orderList.periodId" placeholder="请选择">
            <el-option label='请选择' value=''></el-option>
            <el-option
              v-for="item in orderForm.periodDataItem"
             :key="item.id"
             :label="item.qs"
             :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <el-form-item label="保单类型" prop="insuranceType">
         <el-radio-group v-model="orderList.insuranceType">
           <el-radio :label="1">投保单号</el-radio>
           <el-radio :label="2">保单号</el-radio> 
        </el-radio-group>
      </el-form-item>
       <el-form-item label="保单号码" prop="insuranceNo">
         <el-input v-model="orderList.insuranceNo" placeholder="请输入保单号码" style='width:195px;'></el-input>
      </el-form-item>
       <el-form-item label="保单金额" prop="insuranceMoney">
         <el-input v-model="orderList.insuranceMoney" placeholder="请输入保单金额" style='width:195px;'></el-input>
      </el-form-item>
       <el-form-item label="手续费承担 " prop="feeType">
         <el-radio-group v-model="orderList.feeType">
           <el-radio :label="1">代理人承担</el-radio>
           <el-radio :label="2">客户承担</el-radio> 
        </el-radio-group>
     </el-form-item>
      <el-form-item label="缴费户名" prop="settleName">
         <el-input v-model="orderList.settleName" placeholder="请输入缴费户名" style='width:195px;'></el-input>
      </el-form-item>
        <el-form-item label="缴费银行" prop="settleBankId">
         <el-select v-model="orderList.settleBankId" placeholder="请选择">
            <el-option label='请选择' value=''></el-option>
            <el-option
              v-for="item in orderForm.banksLists"
             :key="item.id"
             :label="item.bank"
             :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
       <el-form-item label="缴费身份证号" prop="settleIdCardNo">
         <el-input v-model="orderList.settleIdCardNo" placeholder="请输入缴费身份证号" style='width:195px;'></el-input>
      </el-form-item>
      <el-form-item label="缴费账号" prop="settleBankAccount">
         <el-input v-model="orderList.settleBankAccount" placeholder="请输入缴费账号" style='width:195px;'></el-input>
      </el-form-item>
      <el-form-item label="保单号图片" prop="picId">
      <el-upload
       class="upload-demo"
       :action="imgupload"
       :on-success="handleAvatarSuccess"
       :headers="headers"
       :file-list="fileList"
        list-type="picture"
       multiple>
        <el-button size="small" type="primary">点击上传</el-button>
       </el-upload>
       
      </el-form-item>

     <el-form-item>
         <el-button size="small" type="success" @click="submitForm('orderList')">生成订单</el-button>
      </el-form-item>
     
</el-form>

<!-- 订单生成成功 -->
<el-dialog
  title=""
  :visible.sync="orderVisile"
  width="400px">
  <div>
      <div style="text-align:center">
        <img src="static/images/right.png" alt="">
        <h2>订单生成</h2>
        <p>订单已生成，赶紧发送给客户吧！</p>
        <div style="width:300px;margin:0px auto;">
         <el-form label-width="80px" :model="mobileList" :rules="mobilerules" ref="mobileList">
         <el-form-item label="手机号" prop="phone">
             <el-input v-model="mobileList.phone" placeholder="请输入手机号" style='width:195px;'></el-input>
         </el-form-item>
        </el-form>
        </div>
       
      </div>
    
  </div>
  <div slot="footer" class="dialog-footer" style="text-align:center">
    
    <el-button type="success" @click="sendMobile('mobileList')">发送</el-button>
  </div>
</el-dialog>

</div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { Message } from 'element-ui'

export default {
  name: 'dashboard',
 
  data(){
    return{
      mobileList:{
        orderId:'',
        phone:''
      },
      orderVisile:false,
      fileList:[],
      orderForm:'',
      orderList:{
        insuranceId:'',
        productId:'',
        periodId:'',
        insuranceType:1,
        insuranceNo:'',
        insuranceMoney:'',
        feeType:1,
        settleName:'',
        settleIdCardNo:'',
        settleBankId:'',
        picId:''
      },
      productVoList:'',
      imgupload:process.env.BASE_API+'/pcagentapi/order/insurance/upload',
      headers:{
         'Ticket':getToken()
      },
     rules:{
       insuranceId: [{ required: true, message: '请选择保险公司', trigger: 'change' }],
       productId: [{ required: true, message: '请选择保险产品', trigger: 'change' }],
       periodId: [{ required: true, message: '请选择分期期数', trigger: 'change' }],
       insuranceNo: [{ required: true, message: '请输入保单号码', trigger: 'change' }],
       insuranceMoney:[{ required: true, message: '请输入保单金额', trigger: 'change' }],
       settleName:[{ required: true, message: '请输入缴费户名', trigger: 'change' }],
       settleBankId:[{ required: true, message: '请选择缴费银行', trigger: 'change' }],
       settleIdCardNo:[{ required: true, message: '请输入缴费身份证号', trigger: 'change' }],
       settleBankAccount:[{ required: true, message: '请输入缴费账号', trigger: 'change' }],
      //  picId:[{ required: true, message: '请上传图片', trigger: 'change' }],
     }, 
     mobilerules:{
       phone:[{ required: true, message: '请输入手机号码', trigger: 'change' }],
     }
    }
  },

  created(){
    this.init();
  },

  watch:{
    'orderList.insuranceId'(val){
       this.orderList.productId = '';
       if(this.orderForm != '' && val !=''){
        this.productVoList = this.orderForm.companyVos[parseInt(val)-1].productVoList;
        if(this.productVoList.length == 0){
          this.productVoList = '';
        }
      }else{
        this.productVoList = '';
      }

    }
  },

  methods:{
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.$store.dispatch('OrderSubmit',this.orderList).then((data) => {
             console.log(data);
              if(data.code == 200){
                this.mobileList.orderId=data.data.orderId;
                this.orderVisile = true;
              }else{
                  Message({
                 message: data.msg,
                 type: 'danger',
                 duration: 5 * 1000
            })
              }
           })
          } else {
            return false;
          }
        });
    },
    sendMobile(formName){
       this.$refs[formName].validate((valid) => {
           console.log(valid);
          if (valid) {
           this.$store.dispatch('Sendsms',this.mobileList).then((data) => {
              console.log(data);
              if(data.code == 200){
                this.orderVisile = false;
              }
           })
          } else {
            return false;
          }
        });
    },
    init(){
       this.$store.dispatch('OrderInit').then((data) => {
           this.orderForm = data.data;
       })
    },
    handleAvatarSuccess(response, file, fileList){
       console.log(response);
       if(response.code == 200){
          Message({
             message: '操作成功！',
             type: 'success',
             duration: 5 * 1000
            })
            this.orderList.picId = response.data.url;
       }else{
           Message({
             message: response.msg,
             type: 'danger',
             duration: 5 * 1000
            })
       }
       
   }
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