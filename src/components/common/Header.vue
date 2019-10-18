<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">
      <span
        class="titleName"
        style="display:inline-block;height:70px;line-height70px"
      >综合服务平台</span>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <!-- <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
        </div>-->
        <!-- 用户头像 -->
        <!-- <div class="user-avator"><img :src="sysuser.avatar" ></div> -->
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{sysuser.account}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided command="changeSub">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>        
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog :visible.sync="PwdDialog" width="600px" :show-close="false" :close-on-click-modal="false" >
      <el-form
        :model="ruleForm"
        status-icon      
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
       <!-- :rules="rules" -->
       <el-form-item label="旧密码" prop="oldPwd">
          <el-input v-model="ruleForm.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input  v-model="ruleForm.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password_confirm">
          <el-input  v-model="ruleForm.password_confirm" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="cancle">取消</el-button>
          <el-button type="primary" @click="changeSub(ruleForm)">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../common/bus";
import AccountApi from "../common/account";

export default {
  data() {
    return {
      collapse: false,
      fullscreen: false,
      PwdDialog:false,
      name: "黄帅",
      message: 2,
      user: null,
      ruleForm:{
          oldPwd:"",
          newPwd:"",
          password_confirm:""

      }
    };
  },
  computed: {
    username() {
      return this.name;
    },
    sysuser() {
      let sysuser = JSON.parse(localStorage.getItem("sysuser"));
      return sysuser ? sysuser : this.user;
    }
  },
  methods: {
    cancle(){
    this.PwdDialog=false
    this.$refs.ruleForm.resetFields()
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        this.handleLogout();
      }
      if (command == "changeSub") {
        this.PwdDialog=true
        // this.changeSub();
      }
    },
    changeSub(item) {   
      let para = item
       AccountApi.changPwd(para).then(res =>{
         if(!res.error){
            this.PwdDialog=false
           this.$refs.ruleForm.resetFields()
           this.$message({
            message: "操作成功",
            type: "success"
          });
         }else{
            this.$message.error(res.data.msg);
         }
      })
    },
    handleLogout() {
      // AccountApi.handleLogout().then(
      //   res => {
           localStorage.removeItem("sysuser");
          this.$router.push("/login");
      //   },
      //   err => {
      //     this.$message.error(err.msg);
      //   }
      // );
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.titleName {
  height: 70px;
  display: inline-block;
  line-height: 70px;
  font-size: 30px;
  letter-spacing: 8px;
  margin-right: 10px;
  color: #fff692;
}
/* .backIcon {
  background: url("../../assets/danghui.png") no-repeat center;
  height: 70px;
  width: 70px;
  display: inline-block;
} */
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  line-height: 70px;
  display: flex;
  /* float: left;
        width:250px;
        line-height: 70px; */
}
.header-right {
  position: absolute;
  top: 0px;
  right: 30px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
