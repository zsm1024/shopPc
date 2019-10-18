<template>
  <section>
    <el-table :data="tableData" v-loading="loading" border class="table" ref="multipleTable">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-table :data="props.row.cartDetailList" stripe border>
            <el-table-column prop="goodsCode"  label="编号" sortable ></el-table-column>
            <el-table-column prop="goodsName"  label="名称" sortable ></el-table-column>
            <el-table-column prop="fileList" label="图片" sortable >
                <img :src="props.row.cartDetailList"/> 
                {{props.row.cartDetailList.fileList}}
            </el-table-column>
            <el-table-column prop="price"  label="单价" sortable ></el-table-column>
            <el-table-column prop="amount"  label="数量" sortable ></el-table-column>
            <el-table-column prop="detailTotalPrice"  label="总价" sortable ></el-table-column>
             <el-table-column prop="unit"  label="单位" sortable ></el-table-column>

          </el-table>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(items,index) in tableColum"
        :key="index"
        header-align="center"
        align="center"
        :prop="items.prop"
        :label="items.title"
      ></el-table-column>
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
  </section>
</template>

<script>
import RoleApi from "../../../api/pro";
export default {
  data() {
    return {
      tableData: [],
      loading: false,
      tableColum: [
        { title: "用户名称", prop: "bossName" },
        { title: "产品数量", prop: "goodsCount" },
        { title: "产品总价", prop: "totalPrice" },
        { title: "产品种类", prop: "categoryCount" },
      ],
      page: { pageNo: 1, pageSize: 20 },
      req: {}
    };
  },
  methods: {
    getData() {
      this.req.currentPage = this.page.pageNo;
      this.req.pageSize = this.page.pageSize;
      RoleApi.ShoppingCart(this.req).then(
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
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style>
</style>