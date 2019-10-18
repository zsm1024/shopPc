<template>
  <section id="charts" :class="activeClass == 0 ? 'actives':'Noactive'">
    <!-- <div id="content2">
      <div class="NoticeList">
        <div class="NewsList">
          <scroll :data="listData" :class-option="optionSingleHeightTime" class="seamless-warp">
            <ul>
              <li v-for="(item,index) in listData" :key="index" class="UlLi">
                <span class="Marspaces">
                  <i class="circles"></i>
                  {{item.title}}
                </span>
                <span class="Marspace">{{item.town}}</span>
                <span class="Marspace">{{item.contact}}</span>
                <span class="Marspace">{{item.createTime}}</span>
              </li>
            </ul>
          </scroll>
          
        </div>  
      </div>
    </div>  -->
    <div
          class="btn-fullscreen"
          @click="handle"
          style="text-align:right;margin-right:20px;position: absolute;
          top: 40px;
          right: 30px;"
        >
          <el-tooltip effect="dark" content="全屏/取消全屏" placement="bottom">
            <i class="el-icon-rank" id="fullScreens"></i>
          </el-tooltip>
        </div>    
  </section>
</template>
<script>
import scroll from "vue-seamless-scroll";
import baseApi from "../../api/api";
export default {
  components: { scroll },
  data() {
    return {
      listData: [],
      activeClass: 1,
      fullscreen: false
    };
  },
  computed: {
    optionSingleHeightTime() {
      return {
        singleHeight: 40,
        waitTime: 2000
      };
    }
  },
  mounted() {
    this.getnewList();
  },
  methods: {
    handle() {
      this.activeClass = 1;
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
        // this.getBeneficiaries();
        // this.getJuData();
        // this.getOccargan();
        // this.getnewList();
        // this.getStatues();
        // this.getbARdata();
        // this.getTotalNum();
      } else {
        this.activeClass = 0;
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
      //   this.getBeneficiaries();
      //   this.getJuData();
      //   this.getOccargan();
      //   this.getnewList();
      //   this.getStatues();
      //   this.getbARdata();
      //   this.getTotalNum();
      this.fullscreen = !this.fullscreen;
    },
    getnewList() {
      let dataTime = this.getLast3Month(Date.now());

      let para = dataTime.last + "/" + dataTime.now;
      console.log(para);
      baseApi.getNewsList(para).then(res => {
        if (!res.error) {
          this.listData = res.data.data;
        }
      });
    },
    getLast3Month() {
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1; //0-11表示1-12月
      var day = now.getDate();
      var dateObj = {};
      if (parseInt(month) < 10) {
        month = "0" + month;
      }
      if (parseInt(day) < 10) {
        day = "0" + day;
      }

      dateObj.now = year + "-" + month + "-" + day;

      if (parseInt(month) == 1) {
        //如果是1月份，则取上一年的10月份
        dateObj.last = parseInt(year) - 1 + "-10-" + day;
        return dateObj;
      }
      if (parseInt(month) == 2) {
        //如果是2月份，则取上一年的11月份
        dateObj.last = parseInt(year) - 1 + "-11-" + day;
        return dateObj;
      }
      if (parseInt(month) == 3) {
        //如果是3月份，则取上一年的12月份
        dateObj.last = parseInt(year) - 1 + "-12-" + day;
        return dateObj;
      }

      var preSize = new Date(year, parseInt(month) - 3, 0).getDate(); //开始时间所在月的总天数
      if (preSize < parseInt(day)) {
        // 开始时间所在月的总天数<本月总天数，比如当前是5月30日，在2月中没有30，则取下个月的第一天(3月1日)为开始时间
        let resultMonth =
          parseInt(month) - 2 < 10
            ? "0" + parseInt(month) - 2
            : parseInt(month) - 2;
        dateObj.last = year + "-" + resultMonth + "-01";
        return dateObj;
      }

      if (parseInt(month) <= 10) {
        dateObj.last = year + "-0" + (parseInt(month) - 3) + "-" + day;
        return dateObj;
      } else {
        dateObj.last = year + "-" + (parseInt(month) - 3) + "-" + day;
        return dateObj;
      }
    }
  }
};
</script>
<style>
#charts {
  width: 100%;
  height: 100%;
  /* background: url("../../assets/chart_bg.gif") no-repeat; */
  /* background-size: 100% 100%; */
}
#content2 {
  width: 100%;
  height: 100%;
  background: url("../../assets/ti2.png") no-repeat;
  background-size: 100% 100%;
}
.seamless-warp {
  height: 300px;
  overflow: hidden;
  width:85%;
  margin: 0 auto
}
.NoticeList {
  width: 100%;
  height: 98%;
  background: url("../../assets/notice.png") no-repeat;
  background-size: 100% 100%;
  background-position: 0 47px;
}
  .actives {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9000;
  }
  .Noactive {
    position: unset;
  }
</style>


