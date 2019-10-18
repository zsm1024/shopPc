<template>
  <section style="height:100%" class="IndexBg">
         <div>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-card shadow="hover" class="mgb20" style="height:252px;">
            <div class="user-info">
              <img :src="sysuser.avatar" class="user-avator" alt>
              <div class="user-info-cont">
                <div class="user-info-name">{{sysuser.account}}</div>
                <div>{{sysuser.roleNames[0]}}</div>
              </div>
            </div>
            <div class="user-info-list">
              真实姓名：
              <span>{{sysuser.name}}</span>
            </div>
            <div class="user-info-list">
              所在部门：
              <span>{{sysuser.deptName}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
// import 'viewerjs/dist/viewer.css'
// import Viewer from 'v-viewer'
// import Swiper from "swiper";
// import Schart from "vue-schart";
// import bus from "../common/bus";
// import { getDashboardContent } from "../../api/api";
import DashboardApi from "../../api/dashboard";
export default {
  name: "dashboard",
  data() {
    return {
      user: null,
    };
  },
  // components: {
  //   Schart
  // },
  computed: {
    sysuser() {
      let sysuser = JSON.parse(localStorage.getItem("sysuser"));
      console.log(sysuser)
      return sysuser ? sysuser : this.user;
    }
  },
  created() {
    // this.getDashboardContent();
    this.handleListener();
  },
  activated() {
    this.handleListener();
  },
  deactivated() {
    window.removeEventListener("resize", this.renderChart);
    bus.$off("collapse", this.handleBus);
  },
  mounted() {
    // this.getBoundary()
  },
  methods: {
    // getDashboardContent() {
    //   let para = {};
    //   getDashboardContent().then(
    //     res => {
    //     },
    //     err => {
    //       this.$message.error(err.msg);
    //     }
    //   );
    // },
    handleListener() {
      bus.$on("collapse", this.handleBus);
      // 调用renderChart方法对图表进行重新渲染
      window.addEventListener("resize", this.renderChart);
    },
    handleBus(msg) {
      setTimeout(() => {
        this.renderChart();
      }, 300);
    }
  },
  
  mounted() {
  }
};
</script>


<style scoped>
/* .IndexBg{
  background: url("../../assets/indexBg.png") no-repeat 100% 100%;
  background-size: 100% 100%;
  height: 100%
} */
.el-row {
  margin-bottom: 20px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}

.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}

.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}

.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}

.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}

.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}

.user-info-list span {
  margin-left: 70px;
}

.mgb20 {
  margin-bottom: 20px;
}

.todo-item {
  font-size: 14px;
}

.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.schart {
  width: 100%;
  height: 300px;
}
/* .slid1 {
  background-image: url("../../assets/slid1.jpg");
}
.slid2 {
  background-image: url("../../assets/slid2.jpg");
}
.slid3 {
  background-image: url("../../assets/slid3.jpg");
}
.slid4 {
  background-image: url("../../assets/slid4.jpg");
} */
   .swiper-container {
      width: 95%;
      padding-top:3% ;
    }
    .swiper-slide {
      /* background-position: center;
      background-size: cover; */
      /* width: 300px; */
      height:100%;

    }
    .titleBg{text-align: center;padding-top: 50px}
    .Bgimgs{display: inline-block;width: 100%}
</style>
