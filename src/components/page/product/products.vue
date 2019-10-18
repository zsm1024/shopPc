<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-people"></i>货品管理
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-form :model="req" :inline="true" label-width="100px">
          <el-form-item label="编号">
            <el-input v-model="req.code" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="req.name" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="货品分类">
            <!-- <el-form-item label="货品分类" prop="categoryName"> -->
            <el-select v-model="req.categoryName" placeholder style="width:150px">
              <el-option v-for="item in catList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-input v-model="req.code" style="width:150px"></el-input>
          </el-form-item>-->
          <el-form-item label="品牌">
            <el-select v-model="req.brandName" placeholder style="width:150px">
              <el-option
                v-for="item in getbrandList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供货商">
            <el-input v-model="req.supplier" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="产品状态">
            <el-select v-model="req.status" placeholder style="width:150px">
              <el-option label="在售" value="1"></el-option>
              <el-option label="下架" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-input v-model="req.wareHose" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            <el-button type="primary" icon="search" @click="reset()">重置</el-button>
            <el-button
              type="primary"
              icon="add"
              class="handle-del mr10"
              @click="handleAdd()"
              ref="btn"
            >新增</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-input style="width: 130px" v-model="req.roleName" placeholder="请输入门店名称"></el-input>
        <span class="bttn1">
          <el-button type="primary" icon="search" @click="search()">搜索</el-button>
        </span>
        <span class="bttn2">
          <el-button type="primary" icon="search" @click="reset()">重置</el-button>
        </span>-->
        <!-- <span class="bttn3">
          <el-button
            type="primary"
            icon="add"
            class="handle-del mr10"
            @click="handleAdd()"
            ref="btn"
          >新增</el-button>
        </span>-->
      </div>
      <el-table :data="tableData" v-loading="loading" border class="table" ref="multipleTable">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column header-align="center" align="center" prop="code" label="货品编号"></el-table-column>
        <el-table-column header-align="center" align="center" prop="name" label="货品名称"></el-table-column>
        <el-table-column header-align="center" align="center" prop="categoryName" label="货品分类"></el-table-column>
        <el-table-column header-align="center" align="center" prop="category" label="图片">
          <template slot-scope="scope">
            <el-popover
              placement="right"
              title
              trigger="hover"
              v-for="(item,$index) in scope.row.fileInfoEntityList"
              :key="$index"
            >
              <img :src="item.filePath" />
              <img
                slot="reference"
                :src="item.filePath"
                alt="122"
                style="height: 50px;width: 130px"
              />
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" prop="brandName" label="货品品牌"></el-table-column>
        <el-table-column header-align="center" align="center" prop="supplier" label="供货商"></el-table-column>
        <el-table-column header-align="center" align="center" prop="specification" label="规格"></el-table-column>
        <el-table-column header-align="center" align="center" prop="unit" label="单位"></el-table-column>
        <el-table-column header-align="center" align="center" prop="expiryDate" label="保质期"></el-table-column>
        <el-table-column header-align="center" align="center" prop="status" label="产品状态"></el-table-column>
        <el-table-column header-align="center" align="center" prop="costPrice" label="成本价格"></el-table-column>
        <el-table-column header-align="center" align="center" prop="price" label="成本售价"></el-table-column>
        <el-table-column header-align="center" align="center" prop="weight" label="重量"></el-table-column>
        <el-table-column header-align="center" align="center" prop="wareHose" label="所属仓库"></el-table-column>
        <el-table-column header-align="center" align="center" prop="salesVolume" label="销量"></el-table-column>
        <el-table-column header-align="center" align="center" prop="source" label="来源"></el-table-column>
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
      title="新增货品管理"
      :visible.sync="editVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form
        ref="role"
        :model="role"
        label-width="100px"
        style="height:300px;overflow-y:auto"
        :rules="rules"
      >
        <el-form-item label="货品编号" prop="code">
          <el-input v-model.trim="role.code" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="货品名称" prop="name">
          <el-input v-model.trim="role.name" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="货品分类" prop="categoryName">
          <el-select v-model="role.categoryName" placeholder>
            <el-option v-for="item in catList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <!-- <el-input v-model.trim="role.category" maxlength="10"></el-input> -->
        </el-form-item>
        <el-form-item label="货品品牌" prop="brandName">
          <el-select v-model="role.brandName" placeholder>
            <el-option
              v-for="item in getbrandList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-input v-model.trim="role.brand" maxlength="10"></el-input> -->
        </el-form-item>
        <el-form-item label="货品图片">
          <el-upload
            class="upload-demo"
            ref="upload"
            action=" "
            :accept="'image/*'"
            :on-change="handleChange"
            :on-success="uploadSuccess"
            :auto-upload="false"
            :multiple="true"
            :show-file-list="fileListStatue"
          >
            <el-button type="primary" v-model="role.file" icon="el-icon-upload2">从新上传图片</el-button>
          </el-upload>
          <div v-if="role.fileInfoEntityList">
            <div
              class="imagePost imgLIst"
              style="width:100px;position:relative;display:inline-block;margin-left:10px"
              :key="index"
              v-for="(img,index) in fileInfoEntityList"
            >
              <img :src="img.filePath" style="width:100px;" />
              <span class="upbtnGroups" @click="deletePics(img,index)">删除</span>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="供应商" prop="supplier">
          <el-input v-model.trim="role.supplier" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="specification">
          <el-input v-model.trim="role.specification" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model.trim="role.unit" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="保质期" prop="expiryDate">
          <el-input v-model.trim="role.expiryDate" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item label="产品状态" prop="status">
          <el-select v-model="role.status" placeholder>
            <el-option label="在售" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
          <!-- <el-input v-model.trim="role.status" maxlength="10"></el-input> -->
        </el-form-item>
        <el-form-item label="成本价格" prop="costPrice" maxlength="500">
          <el-input v-model.trim="role.costPrice"></el-input>
        </el-form-item>
        <el-form-item label="产品售价" prop="price" maxlength="500">
          <el-input v-model.trim="role.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)" prop="weight" maxlength="500">
          <el-input v-model.trim="role.weight"></el-input>
        </el-form-item>
        <el-form-item label="所属仓库" prop="wareHose" maxlength="500">
          <el-input v-model.trim="role.wareHose"></el-input>
        </el-form-item>
        <!-- <el-form-item label="销量" prop="salesVolume" maxlength="500">
          <el-input v-model.trim="role.salesVolume"></el-input>
        </el-form-item>-->
        <!-- <el-form-item label="来源" prop="source" maxlength="500">
          <el-select v-model="role.source" placeholder>
            <el-option label="蜗之牛" value="1"></el-option>
            <el-option label="非蜗之牛" value="0"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="quxiao('role')">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="saveEdit(role)">确 定</el-button>
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
      file: [],
      fileListStatue: true,
      tableColum: [
        { title: "货品编号", prop: "code" },
        { title: "货品名称", prop: "name" },
        { title: "货品分类", prop: "category" },
        { title: "品牌", prop: "brand" },
        { title: "供应商", prop: "supplier" },
        { title: "规格", prop: "specification" },
        { title: "单位", prop: "unit" },
        { title: "保质期", prop: "expiryDate" },
        { title: "产品状态", prop: "status" },
        { title: "成本价格", prop: "costPrice" },
        { title: "产品售价", prop: "price" },
        { title: "重量（g）", prop: "weight" },
        { title: "所属仓库", prop: "wareHose" },
        { title: "销量", prop: "salesVolume" },
        { title: "来源", prop: "from" }
      ],
      catList: [],
      getbrandList: [],
      configMenuDialog: false,
      tableData: [],
      page: { pageNo: 1, pageSize: 20 },
      multipleSelection: [],
      is_search: false,
      editVisible: false,
      delVisible: false,
      role: {
        code: "",
        name: "",
        category: "",
        brand: "",
        supplier: "",
        specification: "",
        unit: "",
        expiryDate: "",
        status: "",
        costPrice: "",
        price: 0,
        weight: 0,
        wareHose: "",
        salesVolume: "",
        source: "",
        fileInfoEntityList: []
        //   file:[]
      },
      idx: -1,
      ids: [],
      req: {},
      accountInput: true,
      loading: false,
      menuTreeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      rules: {
        names: [
          { required: true, message: "请输入品牌名称", trigger: "blur" }
          //   { min: 0, max: 20, message: "长度在 0 到 10 个字符", trigger: "blur" }
        ]
      },

      checkMenuData: [],
      roleId: null,
      fileInfoEntityList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    deletePics(item, index) {
      RoleApi.deletePic(item.id).then(res => {
        if (!res.data.error) {
          this.fileInfoEntityList.splice(index, 1);
        }
      });
    },
    handleChange(file, fileList) {
      this.file = fileList;
    },
    uploadSuccess(response, file, fileList) {
      if (!response.error) {
        this.$refs.upload.clearFiles();
        this.fileListStatue = false;
        // this.editForms = {};
        // this.DealDialog = false;
      } else {
        this.$message.error(response.msg);
      }
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
      this.req.currentPage = this.page.pageNo;
      this.req.pageSize = this.page.pageSize;
      RoleApi.goodslist(this.req).then(
        res => {
          this.loading = false;
          if (!res.data.error) {
            this.tableData = res.data.data.records ? res.data.data.records : [];
            this.page.pageNo = parseInt(res.data.data.current);
            this.page.totalRows = parseInt(res.data.data.total);
          } else {
            this.$message.error(res.msg);
          }
          this.tableData.forEach(el => {
            if (el.source == 0) {
              el.source = "系统";
            } else {
              el.source = "蜗之牛";
            }
            if (el.status == 0) {
              el.status = "下架";
            } else {
              el.status = "在售";
            }
          });
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
      this.req={};
      this.getData();
    },
    handleAdd() {
      this.role = {};
      this.editVisible = true;
      this.file = [];
    },
    handleEdit(index, row) {
      this.editVisible = true;
      this.idx = index;
      const item = this.tableData[index];
      this.role = item;
      this.file = [];
      this.fileInfoEntityList = row.fileInfoEntityList;
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
    saveEdit(item) {
      let formData = new FormData();
      if (this.file.length > 0) {
        this.file.forEach(el => {
          let blobs = URL.createObjectURL(el.raw);
          // console.log(blobs)
          formData.append("file", el.raw);
        });
      } else {
        formData.append("file", "");
      }
      if (item.id) {
        formData.append("id", item.id);
      }
      if (this.isNumber(item.status)) {
        item.status = item.status;
        // para.village = item.villageName;
      } else {
        if (item.status == "在售") {
          item.status = 1;
        } else {
          item.status = 0;
        }
        // para.village = item.village;
      }
      if (this.isNumber(item.brandName)) {
        item.brand = item.brandName;
      } else {
        item.brand = item.brand;
      }
      if (this.isNumber(item.categoryName)) {
        item.category = item.categoryName;
      } else {
        item.category = item.category;
      }
      formData.append("wareHose", item.wareHose);
      formData.append("weight", item.weight);
      formData.append("price", item.price);
      formData.append("costPrice", item.costPrice);
      formData.append("status", item.status);
      formData.append("expiryDate", item.expiryDate);
      formData.append("unit", item.unit);
      formData.append("specification", item.specification);
      formData.append("supplier", item.supplier);
      formData.append("brand", item.brand);
      formData.append("category", item.category);
      formData.append("name", item.name);
      formData.append("code", item.code);
      //   console.log(formData)
      //   this.$refs[role].validate(valid => {
      // if (valid) {
      this.loading = true;
      RoleApi.goods(formData).then(
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
      // } else {
      //   console.log("error submit!!");
      //   return false;
      // }
      //   });
    },
    // 确定删除
    deleteRow() {
      RoleApi.goodsdelete(this.ids).then(
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
    isNumber(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
      if (regPos.test(val) || regNeg.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    // 获取商品分类
    getCatorge() {
      let para = {
        currentPage: "1",
        pageSize: "3000"
      };
      RoleApi.categorylist(para).then(res => {
        this.catList = res.data.data.records;
        console.log(res);
      });
    },
    //获取品牌分类
    getbrand() {
      let para = {
        currentPage: "1",
        pageSize: "3000"
      };
      RoleApi.brandlist(para).then(res => {
        this.getbrandList = res.data.data.records;
        console.log(res);
      });
    }
  },
  mounted() {
    this.getCatorge();
    this.getbrand();
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
.upbtnGroups {
  position: absolute;
  bottom: 12px;
  left: 0;
  color: #fff;
  display: inline-block;
  width: 100px;
  background: rgba(255, 255, 255, 0.3);
  height: 16px;
  line-height: 16px;
  text-align: center;
}
</style>
<style>
.bttn1 .el-button--primary {
  background-color: #54ace5;
  border: none;
}
.bttn2 .el-button--primary {
  background-color: #c0cdd2;
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