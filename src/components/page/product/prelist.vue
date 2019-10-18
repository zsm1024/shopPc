<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i> 预存款审核
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-container>
        <el-container>
          <el-header>
              <el-input style="width: 180px" v-model="req.account" placeholder="请输入账号"></el-input>
        <span class="bttn1">
          <el-button type="primary" icon="search" @click="search()">搜索</el-button>
        </span>
        <span class="bttn2">
          <el-button type="primary" icon="search" @click="reset()">重置</el-button>
        </span>
          </el-header>
          <el-main>
            <el-table
              :data="tableData"
              v-loading="loading"
              border
              class="table"
              ref="multipleTable"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center"></el-table-column>
              <!-- <el-table-column label="用户头像" min-width="120" align="center">
                <template v-if="scope.row.avatar" slot-scope="scope">
                  <img :src="scope.row.avatar" style="width: 100px;height: 100px">
                </template>
              </el-table-column>-->
              <el-table-column prop="bossName" align="center" label="账号"></el-table-column>
              <el-table-column prop="prepaidAmount" align="center" label="金额"></el-table-column>
              <el-table-column label="操作" width="250" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    icon="el-icon-edit"
                    @click="handleEdit(scope.$index, scope.row)"
                  >通过</el-button>
                  <!-- <el-button
                    type="text"
                    icon="el-icon-delete"
                    class="red"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </el-container>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="50%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="账号">
          <el-input  v-model="form.account"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-tag type="danger">新增的用户密码默认:123456</el-tag>
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
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
      RoleApi.auditingList(para).then(res => {
        this.tableData = res.data.data;
        console.log(res)
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
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
      reset() {
      this.req.account = "";
      this.getData();
    },

    handleAdd() {
      this.form = {};
      this.editVisible = true;
      this.accountInput = false;
      this.form.status = true;
    },
    handleEdit(index, row) {
        let id = row.id
         RoleApi.auditingOrd(id).then(res =>{
             if(!res.data.error){
                 this.$message({
                      message: res.data.data.msg,
                type: "success"
                 })
             }else{
                this.$message.error(res.data.msg); 
             }
             console.log(res)
         })
        // /auditing
    },
    handleDelete(index, row) {
      this.ids = [row.id];
      this.delVisible = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit() {
      // this.$set(this.tableData, this.idx, this.form);
      this.loading = true;
      RoleApi.saveShopowner(this.form).then(
        res => {
          this.loading = false;
          if (!res.data.error) {
            this.editVisible = false;
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        },
        err => {
          this.loading = false;
          this.$message.error(err.data.msg);
        }
      );
    },
    // 确定删除
    deleteRow() {
      RoleApi.deleteShopowner(this.ids).then(
        res => {
          if (!res.data.error) {
            this.$message({
            message: "删除成功",
            type: "success"
          });
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        },
        err => {
          this.$message.error(err.data.msg);
        }
      );
      this.delVisible = false;
    },
    handleResetPassword(id) {
      let ids = [id];
      this.$confirm("是否确认将密码重置为：123456？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        RoleApi.resetPassword(ids).then(
          res => {
            if (res.data.error === false) {
              this.$message.success(res.data.msg);
              this.reload();
            } else {
              this.$message.error(res.data.msg);
            }
          },
          err => {
            this.$message.error(err.data.msg);
          }
        );
      });
    }
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
