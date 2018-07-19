
// import {Export} from '@/api/export'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
export default {
  name: 'tablemixin',
  data() {
    return {
      radio:'1',
      sendVisile:false,
      apearVisile:false,
      orderID:'',
      cancelVisile:false,
      currentPage: 1, //当前页码
      totalPage: 1, //总页码
      pageSize: 20, //每页条数
      tableData:[],
      loading:true,
      delId:'',
      ticket:getToken()
    }
  },
  watch:{
    checkedList:function(val){
        this.exportClick();
        console.log(this.exportData);
    }
  },
  methods:{
    // 申诉
    appeals(id){
      this.orderID = id;
      this.apearVisile = true;
    },
    // 申诉确认
    appealsure(){
      var obj = {
        type:this.radio,
        orderId:this.orderID
      }

      this.$store.dispatch('AppealsOrder',obj).then((data) => {
        if(data.code == 200){
          this.apearVisile = false;
          this.getPage();
        }
      
     })
      
    },
    // 取消
    cancel(id){
       this.cancelVisile = true;
       this.orderID = id;
    },
    // 取消确定
    sureDelte(){
      this.$store.dispatch('CancelOrder',{orderId:this.orderID}).then((data) => {
        if(data.code == 200){
          this.cancelVisile = false;
          this.getPage();
        }
      
     })
    },
    // 列数匹配
    exportClick(){
      var clist = this.checkedList;
      var eplist = this.exportData;
      clist.map((key) => {
        var a = this.getName(key,this.matchObj);
         this.exportData.cols.map((value, index, array) => {
           if(value.name == a){
              value.checked = true;
           }
        })    
      })
     
    },
    // 获取每个列的对应的英文名
    getName(name,array){
       for(var key in array){
         if(key == name){
           return array[key];
         }
       }
    },
      getPage(){
        let formdata = {pageNo:this.currentPage,pageSize:this.pageSize};
     
        var obj = Object.assign(formdata, this.searchData);
      
        this.$store.dispatch(this.funcName,obj).then((data) => {
          this.loading = false;
          if(data.code == 200){
            this.tableData = data.data.dataList;
            this.totalPage = data.data.total;
          }
        
       })
      },
      handleSizeChange(val) {
        this.pageSize = val;
         this.getPage();
      },
      handleCurrentChange(val) {
        this.currentPage = val;
         this.getPage();
      },
         // 打开添加
     addForm(){
        this.emptyObj(this.sendForm);
        this.addVisible = true;
     },
     // 打开编辑
     editForm(id){
        this.addVisible = true;
        this.$store.dispatch(this.editName,id).then((data) => {
          if(data.code == 200){
            this.sendForm=data.data;
          }
        
        })
        
     },
    //  提交表单 修改或添加
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.saveData(this.sendForm);
          } else {
            return false;
          }
        });
    },
    saveData(obj){
          this.$store.dispatch(this.saveName,obj).then((data) => {
          if(data.code == 200){
            //  刷新表格
             this.getPage();
             this.addVisible = false;
            Message({
             message: '操作成功！',
             type: 'success',
             duration: 5 * 1000
            })
          }
        
        })
     },
     deleteForm(id){
       this.deleteVisible = true;
       this.delId = id;
     },
     deleteData(){
       this.$store.dispatch(this.delName,this.delId).then((data) => {
          if(data.code == 200){
            //  刷新表格
             this.getPage();
             this.deleteVisible = false;
            Message({
             message: '删除成功！',
             type: 'success',
             duration: 5 * 1000
            })
          }
        
        })
     },
    //  表单清空
    emptyObj(obj){
       for(var key in obj){
          obj[key] = '';
       }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
  },
  mounted(){
    this.$nextTick(() => {
      this.getPage();
     
    })
  }
}