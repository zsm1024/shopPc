<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i> 充值记录
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-container>
        <el-container>
          <!-- <el-header> -->
            <!-- <el-input style="width: 180px" v-model="req.bossName" placeholder="请输入商品名称"></el-input>
        <span class="bttn1">
          <el-button type="primary" icon="search" @click="search()">搜索</el-button>
        </span>
        <span class="bttn2">
          <el-button type="primary" icon="search" @click="reset()">重置</el-button>
        </span> -->
          <!-- </el-header> -->
          <el-main>
            <el-table
              :data="tableData"
              v-loading="loading"
              border
              class="table"
              ref="multipleTable"
            >
             <el-table-column
      type="index"
      width="50">
    </el-table-column>
              <el-table-column prop="bossName" align="center" label="账户"></el-table-column>
              <el-table-column prop="prepaidTime" align="center" label="充值时间"></el-table-column>
              <el-table-column prop="prepaidAmount" align="center" label="充值金额"></el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100px;
  height: 100px;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
}

.warning {
  color: #e6a23c;
}

.red {
  color: #ff0000;
}
</style>
<script>
import RoleApi from "../../../api/pro";
export default {
  name: "basetable",
  data() {
    return {
      levelList: [],
      selectDeptDialog: false,
      tableData: [],
      page: { pageNo: 1, pageSize: 10 },
      multipleSelection: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      form: {
        name: "",
        account: "",
        birthday: "",
        email: "",
        phone: "",
        deptId: "",
        roleIds: [],
        level: ""
      },
      idx: -1,
      ids: [],
      req: {},
      accountInput: true,
      loading: false,
      deptTreeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      roleList: []
    };
  },
  mounted() {
    this.checkShopownerList();
    // this.getDeptTreeData();
    // this.getLevelList()
    // this.getRoleList();
  },
  computed: {},
  methods: {
    checkShopownerList() {
      let para = {};
      RoleApi.checkRecord(para).then(res => {
        this.tableData = res.data.data;
      });
    },
    // getLevelList() {
    //   let para = "用户级别";
    //   baseApi.getstatueList(para).then(res => {
    //     if (!res.data.error) {
    //       this.levelList = res.data.data;
    //     }
    //   });
    // },

    getRoleList() {},
    goToSelectDept() {
      this.selectDeptDialog = true;
    },
    selectDeptClick(data) {
      this.selectDeptDialog = false;
      this.form.deptId = data.id;
      this.form.deptName = data.name;
    },
    handleCurrentChange(val) {
      this.page.pageNo = val;
      this.getData();
    },
    changePageSize(value) {
      // 修改每页条数size
      this.page.pageNo = 1;
      this.page.pageSize = value;
      this.tableData = null;
      this.getData();
    },
    reload() {
      this.page.pageNo = 1;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      this.checkShopownerList();
    },
    search() {
      this.is_search = true;
      this.getData();
    },
    handleDelete(index, row) {
      this.ids = [row.id];
      this.delVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}

.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}

.table {
  width: 100%;
  font-size: 14px;
}

.red {
  color: #ff0000;
}
</style>
