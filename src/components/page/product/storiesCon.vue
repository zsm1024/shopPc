<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i>用户商品价格配置
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input style="width: 180px" v-model="req.goodsName" placeholder="请输入商品名称"></el-input>
        <span class="bttn1">
          <el-button type="primary" icon="search" @click="search()">搜索</el-button>
        </span>
        <span class="bttn2">
          <el-button type="primary" icon="search" @click="reset()">重置</el-button>
        </span>
        <span class="bttn3">
          <el-button
            type="primary"
            icon="add"
            class="handle-del mr10"
            @click="handleAdd()"
            ref="btn"
          >配置</el-button>
        </span>
      </div>
      <el-table :data="tableData" v-loading="loading" border class="table" ref="multipleTable">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          v-for="(items,index) in tableColum"
          :key="index"
          header-align="center"
          align="center"
          :prop="items.prop"
          :label="items.title"
        ></el-table-column>
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
      title="配置"
      :visible.sync="editVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form ref="role" :model="role" label-width="100px" :rules="rules">
        <el-form-item label="用户名称" prop="name">
          <label style="display:flex">
            <el-select v-model="role.name" placeholder @change="bossChange">
              <el-option
                v-for="item in bossData"
                :key="item.value"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- <el-input v-model.trim="role.name"></el-input> -->
            <el-button type="primary" size="mini" @click="resiteBtn">重置</el-button>
          </label>
        </el-form-item>
      </el-form>
      <el-table
        :data="goodsData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        border
        class="table"
        ref="goodseTable"
        height="300"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="编号" prop="code"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="原价" prop="price"></el-table-column>
        <el-table-column label="售价">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bossPrice"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao('role')">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="Dissub">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑 -->
    <el-dialog title="编辑11" :visible.sync="Visible" :show-close="false" :close-on-click-modal="false">
      <el-form ref="form" label-width="80px">
        <el-form-item label="售价">
          <el-input v-model="editMoey"></el-input>
        </el-form-item>       
      </el-form>
       <span slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="subMit">确 定</el-button>
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
        { title: "名称", prop: "bossName" },
        { title: "商品编号", prop: "goodsCode" },
        { title: "商品名称", prop: "goodsName" },
        { title: "售价", prop: "bossPrice" }
      ],
      configMenuDialog: false,
      Visible: false,
      tableData: [],
      bossData: [],
      goodsData: [],
      selectList: [],
      page: { pageNo: 1, pageSize: 20 },
      multipleSelection: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      role: { name: "" },
      idx: -1,
      ids: [],
      req: {
        goodsName:""
      },
      editMoey: "",
      rowId: "",
      accountInput: true,
      loading: false,
      menuTreeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      rules: {
        name: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
          //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ]
      },

      checkMenuData: [],
      roleId: null
    };
  },
  created() {
    this.getData();
  },
  computed: {},
  mounted() {
    this.getallBoss();
    this.getGoodsData("");
  },
  methods: {
    cancle() {
      this.Visible = false;
    },
    subMit() {
      let para = {
        bossPrice: this.editMoey,
        id: this.rowId
      };
      RoleApi.bossGoodsupdate(para).then(res => {
          if(!res.data.error){
              this.$message({
                  message:"操作成功",
                  type:"success"
              })
                this.getData();
          }
       
        // this.bossData = res.data.data;
      });
    },
    resiteBtn() {
      this.role.name = "";
      this.getGoodsData("");
    },
    bossChange(val) {
      this.getGoodsData(val);
    },
    handleSelectionChange(val) {
      this.selectList = val;
    },
    //获取全部老板
    getallBoss() {
      RoleApi.getAllBoss().then(res => {
        this.bossData = res.data.data;
      });
    },
    //获取所有商品
    //
    getGoodsData(item) {
      let para = {
        boss: item
      };
      RoleApi.getAllGoods(para).then(res => {
        this.goodsData = res.data.data;
      });
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
    // 获取列表数据
    getData() {
      this.req.currentPage = this.page.pageNo;
      this.req.pageSize = this.page.pageSize;
      RoleApi.bossGoodslist(this.req).then(
        res => {
          this.loading = false;
          if (!res.data.error) {
            this.tableData = res.data.data.records ? res.data.data.records : [];
            this.page.pageNo = parseInt(res.data.data.current);
            this.page.totalRows = parseInt(res.data.data.total);
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
      this.is_search = true;
      this.getData();
    },
    reset() {
      this.req.goodsName = "";
      this.getData();
    },
    handleAdd() {
      this.role = {};
      this.editVisible = true;
      //   this.goodsData.forEach(el => {
      //         el.bossPrice=""
      //   });
    },
    handleEdit(index, row) {
      this.Visible = true;
      this.editMoey = row.bossPrice;
      this.editMoey = row.bossPrice;
      console.log(row);
      this.rowId = row.id;
      //   this.editVisible = true;
      //   this.idx = index;
      //   const item = this.tableData[index];
      //   this.role = item;
    },
    handleDelete(index, row) {
      this.ids = [row.id];
      this.delVisible = true;
    },
    quxiao(role) {
      this.editVisible = false;
      this.$refs[role].resetFields();
    },
    // 保存编辑
    saveEdit(role) {
      // this.$set(this.tableData, this.idx, this.role);
      this.$refs[role].validate(valid => {
        if (valid) {
          this.loading = true;
          RoleApi.category(this.role).then(
            res => {
              this.loading = false;
              if (!res.data.error) {
                this.editVisible = false;
                this.$message({
                  message: res.data.msg,
                  type: "success"
                });
                this.reload();
              } else {
                this.$message.error(res.data.msg);
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
      RoleApi.bossGoodsdelete(this.ids).then(
        res => {
          if (!res.data.error) {
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
    //config 提交给boss配置的商品 价格
    Dissub() {
      let newList = [];
      this.selectList.forEach(el => {
        newList.push({
          boss: this.role.name,
          goodsId: el.id,
          bossPrice: el.bossPrice
        });
      });
      RoleApi.configGoods(newList).then(res => {
        if (!res.data.error) {
          this.$message({
            message: "配置成功",
            type: "success"
          });
          this.editVisible = false;
          this.selectList = [];
        }
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