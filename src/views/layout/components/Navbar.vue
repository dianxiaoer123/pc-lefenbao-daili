<template>

<div>
	  	<el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    

    <div class="breadcrumb-container">
    	<span>欢迎使用乐保分项目管理平台</span>
    	<span>现在时间：{{time}}</span>
    </div>

    <div class="right-menu">
    	  <div class="elAlikLi">
    	     <span>您好，{{pcname}}</span>
    	  </div>
    	 
    	  <div class="elAlikLi">
    	  	<span @click="logout" class='exitIcon'></span>
    	  </div>
    	  
    	  <div class="clearfix"></div>
    	
    </div>
  </el-menu>
  
  <el-dialog
  title="修改密码"
  :visible.sync="dialogVisible"
  width="30%"
 >

  <span>
 
  	<el-form :model='pwForm' :rules="rules" ref="pwForm">
  	 <el-form-item label="旧密码" label-width="80px" prop="oldPwd">
       <el-input type="password" v-model="pwForm.oldPwd" auto-complete="off"></el-input>
     </el-form-item>
     
      <el-form-item label="新密码"  label-width="80px" prop="newPwd">
       <el-input type="password" v-model="pwForm.newPwd" @keyup.enter.native="changePw" auto-complete="off"></el-input>
     </el-form-item>
  	</el-form>
  
  </span>


  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changePw">确 定</el-button>
  </span>
</el-dialog>
</div>
  


</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import { Message } from 'element-ui';

export default {
	data(){
     var validatePassword = (rule, value, callback) => {
        if(value.length == 0){
           callback(new Error('密码不能为空'))
        }else if (value.length < 6) {
           callback(new Error('密码不能少于六位数'))
        } else {
           callback()
        }
      };
		 return {
       pwForm:{
         oldPwd:'',
         newPwd:''
       },
       rules: {
           oldPwd: [{ required: true, trigger: 'blur', validator: validatePassword }],
           newPwd: [{ required: true, trigger: 'blur', validator: validatePassword }]
       },
     
      dialogVisible: false,
      time:'',
      pcname:''
   }
	},
	mounted(){
    // 当前时间
		var that = this;
	    that.getnowTime();
		setInterval(function(){
			that.getnowTime();
    },1000);
    
     this.pcname = localStorage.getItem('pc_admin_role');
	},
  components: {Hamburger},
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    changePw:function(){
       var form = this.pwForm;
       this.$refs.pwForm.validate(valid => {
           if(valid){
             
             this.$store.dispatch('ChangePassword',this.pwForm).then((data) => {
             console.log(data);
              console.log(form);
             if(data.code == 200){
                   Message({
                     message: "密码修改成功，请重新登录！",
                     type: 'success',
                     duration: 5 * 1000
                   })
                   this.logout();
             }
            })
           }else{
            
             return false
           }
       })
   
    },
  	getnowTime:function(){
  		var timestamp = new Date();
		 this.time = timestamp.toLocaleTimeString();
  	},
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.elAlikLi{
	float: left;
	margin-right: 10px;
  display: flex;
  align-items: center;
  height: 50px;
  cursor: pointer;
}
.elAlikLi a{
	display: flex;
	align-items: center;
  height: 50px;
}
.elAlikLi span{
	font-size: 14px;
}
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
    font-size: 14px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .breadcrumb-container span{
  	margin-right: 30px;
  	color:#99a5bd;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
