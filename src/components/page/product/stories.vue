<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i> 门店信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input style="width: 130px" v-model="req.name" placeholder="请输入门店名称"></el-input>
        <span class="bttn1">
          <el-button type="primary" icon="search" @click="search()">搜索</el-button>
        </span>
        <span class="bttn2">
          <el-button type="primary"  @click="reset">重置</el-button>
        </span>
        <span class="bttn3">
          <el-button
            type="primary"
            icon="add"
            class="handle-del mr10"
            @click="handleAdd()"
            ref="btn"
          >新增</el-button>
        </span>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        class="table"
        ref="multipleTable"
      >
        <el-table-column
          v-for="(items,index) in tableColum"
          :key="index"
          header-align="center"
          align="center"
          :prop="items.prop"
          :label="items.title"
        ></el-table-column>
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column label="门店名称" align="center" prop="roleName"></el-table-column>
        <el-table-column label="店长" align="center" prop="remark"></el-table-column>
        <el-table-column label="老板" align="center" prop="createTime"></el-table-column>-->
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              type="text"
              icon="el-icon-delete"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="page.pageSize"
          :current-page="page.pageNo"
          @current-change="handleCurrentChange"
          @size-change="changePageSize"
          layout="prev, pager, next"
          :total="page.totalRows"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog
      title="新增门店"
      :visible.sync="editVisible"
      width="30%"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="role" :model="role" label-width="100px" :rules="rules">
        <el-form-item label="店铺名称" prop="name">
          <el-input v-model.trim="role.name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="店长" prop="shopowner">
            <el-select v-model.trim="role.shopowner" placeholder="">
                <el-option
                    v-for="(item) in options"
                    :key="item.index"
                    :label="item.name"
                    :value="item.id">
                </el-option>
            </el-select>
          <!-- <el-input v-model.trim="role.shopownerName" maxlength="10"></el-input> -->
        </el-form-item>
        <!-- <el-form-item label="老板" prop="bossName">
          <el-input v-model.trim="role.bossName" maxlength="10"></el-input>
        </el-form-item> -->
        <el-form-item label="收件人" prop="addressee">
          <el-input v-model.trim="role.addressee" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phoneNum">
          <el-input v-model.trim="role.phoneNum" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="address">
          <el-input v-model.trim="role.address" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="所属省份" prop="province">
          <el-input v-model.trim="role.province" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" maxlength="500">
          <el-input v-model="role.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao('role')">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="saveEdit('role')">确 定</el-button>
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

<script>
import RoleApi from "../../../api/pro";
export default {
  name: "basetable",
  data() {
    return {
      tableColum: [
        { title: "门店名称", prop: "name" },
        { title: "店长", prop: "shopownerName" },
        { title: "老板", prop: "bossName" },
        { title: "收件人", prop: "addressee" },
        { title: "联系方式", prop: "phoneNum" },
        { title: "收货地址", prop: "address" },
        { title: "所属省份", prop: "province" },
        { title: "备注", prop: "remark" }
      ],
      options:[],//店长列表
      configMenuDialog: false,
      tableData: [],
      page: { pageNo: 1, pageSize: 20 },
      multipleSelection: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      role: {
        name: "",
        shopowner: "",
        addressee: "",
        phoneNum: "",
        address: "",
        province: "",
        remark: "",
        shopownerName:""
      },
      idx: -1,
      ids: [],
      req: {
        name:""
      },
      accountInput: true,
      loading: false,
      menuTreeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
         shopowner: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
        bossName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
         addressee: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
         phoneNum: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
         address: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
         province: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
        //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ],
      },

      checkMenuData: [],
      roleId: null
    };
  },
  created() {
    this.getData();
   
  },
  computed: {},
  mounted(){
 this.checkShopownerList()
  },
  methods: {
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
    getData() {
      this.req.currentPage = this.page.pageNo;
      this.req.pageSize = this.page.pageSize;
      RoleApi.getData(this.req).then(
        res => {
          this.loading = false;
          if (!res.error) {
            this.tableData = res.data.data.records ? res.data.data.records : [];
            this.page.pageNo = parseInt(res.data.data.current);
            this.page.totalRows = parseInt(res.data.data.total);
            this.tableData.forEach(item => {
              item.status = Boolean(item.status);
            });
          } else {
            this.$message.error(res.msg);
          }
        },
        err => {
          this.loading = false;
          this.$message.error(err.msg);
        }
      );
    },
    getMenuTreeData() {
      let parmas = {};
      RoleApi.getMenuTreeData(parmas).then(
        res => {
          if (res.error === false) {
            this.menuTreeData = res.data;
            this.loading = false;
          } else {
            this.$message.error(res.msg);
          }
        },
        err => {
          this.loading = false;
          this.$message.error(err.msg);
        }
      );
    },
    getCheckMenuData(roleId) {
      RoleApi.getCheckMenuData({ roleId: roleId }).then(
        res => {
          if (res.error === false) {
            this.checkMenuData = res.data;
          } else {
            this.$message.error(res.msg);
          }
        },
        err => {
          this.loading = false;
          this.$message.error(err.msg);
        }
      );
    },
    search() {
      this.getData();
    },
    reset() {
      this.req.name = "";
      this.getData()
    },
    handleAdd() {
      this.role = {};
      this.editVisible = true;
    },
    handleEdit(index, row) {
       this.editVisible = true;
       this.role=this.tableData[index]
          this.reload();
      this.idx = index;
    },
    handleDelete(index, row) {
      this.ids = [row.id];
      this.delVisible = true;
    },
    quxiao(role) {
      this.editVisible = false;
      this.$refs[role].resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 保存编辑
    saveEdit(role) {
      this.$refs[role].validate(valid => {
        if (valid) {
          this.loading = true;
          RoleApi.save(this.role).then(
            res => {
              this.loading = false;
              if (!res.error) {
                this.editVisible = false;
                // this.$message.success(res.msg);
                // this.reload();
              } else {
                this.$message.error(res.msg);
              }
            },
            err => {
              this.loading = false;
              this.$message.error(err.msg);
            }
          );
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 确定删除
    deleteRow() {
      RoleApi.batchDelete(this.ids).then(
        res => {
          if (!res.error) {
               this.$message({
            message: "删除成功",
            type: "success"
          });
            // this.$message.success(res.msg);
            this.reload();
          } else {
            this.$message.error(res.msg);
          }
        },
        err => {
          this.$message.error(err.msg);
        }
      );
      this.delVisible = false;
    },
    //查询店长列表
    checkShopownerList(){
        let para={}
RoleApi.checkShopowners(para).then(res =>{
    this.options=res.data.data
})
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
.success {
  color: #67c23a;
}
</style>
<style>
.bttn1 .el-button--primary {
  background-color: #54ace5;
  border: none;
}
.bttn2 .el-button--primary {
  background-color: #75a2b4;
  border: none;
}
.bttn3 .el-button--primary {
  background-color: #76c5a5;
  border: none;
}
.el-tooltip__popper.is-light {
  border-color: #ccc;
}
</style>