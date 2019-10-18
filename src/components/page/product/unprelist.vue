<template>
  <section id="Details">
     <el-form :model="req" :inline="true" label-width="100px">
          <el-form-item label="订单编号">
            <el-input v-model="req.orderCode" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker style="width:150px" type="date" placeholder="选择日期" v-model="req.orderTime"  format="yyyy 年 MM 月 dd 日"
      value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="用户名称">
          <el-input v-model="req.bossName" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="电话">
             <el-input v-model="req.phoneNum" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="审核状态"> 
            <el-select v-model="req.auditStatus" placeholder style="width:150px">
                  <el-option label="未审核" value="0"></el-option>
                  <el-option label="通过" value="2"></el-option>
                  <el-option label="未通过" value="1"></el-option>
                </el-select>
          </el-form-item>
          <el-form-item label="收货人">
              <el-input v-model="req.addressee" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="req.receivingAddress" style="width:150px"></el-input>
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
    <el-table :data="tableData" v-loading="loading" border class="table" ref="multipleTable">
      <el-table-column
        v-for="(items,index) in tableColum"
        :key="index"
        header-align="center"
        align="center"
        :prop="items.prop"
        :label="items.title"
      ></el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.row)">审核</el-button>
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
    <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      lock-scroll
      width="80%"
      style="overflow:auto"
    >
      <div>
        <div>
          <table class="orderTable">
            <tr>
              <td class="titles">订单编号</td>
              <td>{{dialogForm.orderCode}}</td>
              <td class="titles">下单时间</td>
              <td colspan="3">{{dialogForm.orderTime}}</td>
            </tr>
            <tr>
              <td class="titles">货物总价</td>
              <td>{{dialogForm.goodsTotalPrice}}</td>
              <td class="titles">运费</td>
              <td>{{dialogForm.freight}}</td>
              <td class="titles">合计</td>
              <td>{{dialogForm.shouldPay}}</td>
            </tr>
            <tr>
              <td class="titles">缺货种类</td>
              <td>{{dialogForm.stockout}}</td>
              <td class="titles">缺货金额</td>
              <td colspan="3">{{dialogForm.stockFee}}</td>
            </tr>
            <tr>
              <td class="titles">退运费</td>
              <td>
                <el-input v-model="dialogForm.refundFreight" placeholder></el-input>
              </td>
              <td class="titles">降价退款</td>
              <td>
                <el-input v-model="dialogForm.reductionRefund" placeholder></el-input>
              </td>
              <td class="titles">退款合计</td>
              <td>
                <span>{{dialogForm.refund}}</span>
                <!-- <el-input v-model="orderForm.refund" placeholder></el-input> -->
              </td>
            </tr>
            <tr>
              <td class="titles">扣运费</td>
              <td>
                <el-input v-model="dialogForm.decutFreight" placeholder></el-input>
              </td>
              <td class="titles">涨价补款</td>
              <td>
                <el-input v-model="dialogForm.supplement" placeholder></el-input>
              </td>
              <td class="titles">扣款合计</td>
              <td>
                <span>{{ dialogForm.deduction}}</span>
                <!-- <el-input v-model="orderForm.supplement" placeholder></el-input> -->
              </td>
            </tr>
            <tr>
              <td class="titles">审核状态</td>
              <td>
                <el-select v-model="dialogForm.auditStatus" placeholder>
                  <el-option label="未审核" value="0"></el-option>
                  <el-option label="通过" value="2"></el-option>
                  <el-option label="未通过" value="1"></el-option>
                </el-select>
              </td>
              <td class="titles">客户实付</td>
              <td colspan="3">
                <el-input v-model="dialogForm.supplement" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td class="titles">补货说明</td>
              <td>
                <el-input type="textarea" v-model="dialogForm.realPay" placeholder></el-input>
              </td>
              <td class="titles">买家留言</td>
              <td>
                <el-input type="textarea" readonly v-model="dialogForm.buyerMessage" placeholder></el-input>
              </td>
              <td class="titles">卖家留言</td>
              <td>
                <el-input type="textarea" v-model="dialogForm.replenishmentExplai" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td class="titles">包裹数</td>
              <td>
                <el-input v-model="dialogForm.packageCount" placeholder @input="packchange"></el-input>
              </td>
              <td class="titles">服务费</td>
              <td>
                <el-input readonly v-model="packserviceFee" placeholder></el-input>
              </td>
              <td class="titles">合计服务费</td>
              <td>
                <span>{{serviceFee}}</span>
                <!-- <el-input v-model="dialogForm.serviceFee" placeholder></el-input> -->
              </td>
            </tr>
            <tr>
              <td class="titles">箱数量</td>
              <td>
                <el-input v-model="dialogForm.boxCount" placeholder @input="boxchange"></el-input>
              </td>
              <td class="titles">服务费</td>
              <td>
                <el-input v-model="boxserviceFee" placeholder></el-input>
              </td>
              <td class="titles">备注</td>
              <td colspan="3">
                <el-input type="textarea" v-model="dialogForm.remark" placeholder></el-input>
              </td>
            </tr>
            <tr>
              <td class="titles">收件人</td>
              <td>{{dialogForm.addressee}}</td>
              <td class="titles">手机</td>
              <td>{{dialogForm.phoneNum}}</td>
              <td class="titles">地址</td>
              <td>{{dialogForm.receivingAddress}}</td>
            </tr>
          </table>
          <!-- <label><span>订单编号</span></label>
          <label><span></span></label>
          <label><span></span></label>-->
        </div>
        <el-form ref="DialogCheckform" :model="DialogCheck" label-width="80px" inline>
          <el-form-item label="货品编号" label-width="100">
            <el-input v-model="DialogCheck.goodsCode" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="货品名称">
            <el-input v-model="DialogCheck.goodsName" style="width:150px"></el-input>
          </el-form-item>
          <el-form-item label="操作">
            <el-button type="primary" size="mini" @click="checkDialog(listId)"> 查询</el-button>
            <el-button type="primary" size="mini" @click="resiteDialog(listId)"> 重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="dialogTable" style="width: 100%" border>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column prop="goodsCode" label="货品编号"></el-table-column>
          <el-table-column prop="goodsName" label="货品名称" show-overflow-tooltip></el-table-column>
          <el-table-column prop="specification" label="规格"></el-table-column>
          <el-table-column prop="amount" label="数量"></el-table-column>
          <el-table-column prop="stockout" label="缺货数量">
            <template slot-scope="scope">
              <el-input v-model="scope.row.stockout" placeholder></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column label="操作" width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="lackBtn( scope.row)">缺货</el-button>
              <el-button size="mini" type="primary" @click="unlackBtn( scope.row)">不缺货</el-button>
              <!-- scope.$index, -->
            </template>
            
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subBtn(dialogForm)">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
import RoleApi from "../../../api/pro";
export default {
  data() {
    return {
      tableData: [],
      dialogTable: [],
      loading: false,
      dialogVisible: false,
      packserviceFee: 0,
      listId:"",
      boxserviceFee: 0,
      DialogCheck:{
        goodsCode:"",
        goodsName:""
      },
      tableColum: [
        { title: "订单编号", prop: "orderCode" },
        { title: "下单时间", prop: "orderTime" },
        { title: "用户名称", prop: "bossName" },
        { title: "货品总数量", prop: "goodsCount" },
        { title: "货品单价", prop: "goodsTotalPrice" },
        { title: "货品总价", prop: "totalPrice" },
        { title: "总重量(kg)", prop: "totalWeight" },
        { title: "类别总量", prop: "categoryAmount" },
        { title: "电话", prop: "phoneNum" },
        { title: "收货地址", prop: "receivingAddress" },
        { title: "发货方式", prop: "transport" },
        { title: "运费", prop: "freight" },
        { title: "应付总额", prop: "shouldPay" },
        { title: "实付总额", prop: "realPay" },
        { title: "缺货数量", prop: "stockout" },
        { title: "缺货费用", prop: "stockFee" },
        { title: "退款合计", prop: "refund" },
        { title: "审核状态", prop: "auditStatus" },
        { title: "扣款合计", prop: "deduction" },
        { title: "包裹描述", prop: "packageCoun" },
        { title: "包裹数量", prop: "deduction" },
        { title: "收货人", prop: "addressee" },
        { title: "手机号", prop: "phoneNum" },
        { title: "收货地址", prop: "phoneNum" },
        { title: "服务费", prop: "serviceFee" },
        { title: "买家留言", prop: "buyerMessage" }
      ],

      page: { pageNo: 1, pageSize: 20 },
      req: {},
      serviceFee: 0,
      dialogForm: {},
      orderForm: {}
    };
  },
  methods: {
    getData() {
      this.req.currentPage = this.page.pageNo;
      this.req.pageSize = this.page.pageSize;
      RoleApi.unPrelis(this.req).then(
        res => {
          this.loading = false;
          if (!res.data.error) {
            this.tableData = res.data.data.records ? res.data.data.records : [];
            this.page.pageNo = parseInt(res.data.data.current);
            this.page.totalRows = parseInt(res.data.data.total);
            this.tableData.forEach(el => {
              // 0-未审核 1-不通过 2-通过
              if (el.auditStatus == 0) {
                el.auditStatus = "未审核";
              } else if (el.auditStatus == 1) {
                el.auditStatus = "不通过";
              } else {
                el.auditStatus = "通过";
              }
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
    packchange(val) {
      if (!val) {
        val = 0;
      }
      RoleApi.getFeeByCount("包", val).then(res => {
        if (!res.data.error) {
          this.packserviceFee = res.data.fee;
          if (this.boxserviceFee == undefined) {
            this.boxserviceFee = 0;
          }
          this.serviceFee = this.packserviceFee + this.boxserviceFee;
          if (this.packserviceFee == 0 && this.boxserviceFee == 0) {
            this.serviceFee = 0;
          }
        }
      });
    },
    reset(){
      this.req={}
      this.getData()
    },
    search(){
    this.getData()
    },
    boxchange(val) {
      if (!val) {
        val = 0;
      }
      RoleApi.getFeeByCount("箱", val).then(res => {
        if (!res.data.error) {
          this.boxserviceFee = res.data.fee;
          if (this.packserviceFee == undefined) {
            this.packserviceFee = 0;
          }
          this.serviceFee = this.packserviceFee + this.boxserviceFee;
          if (this.packserviceFee == 0 && this.boxserviceFee == 0) {
            this.serviceFee = 0;
          }
        }
      });
    },
    //缺货点击
    lackBtn(item) {
      let para = {
        id: item.id,
        stockout: item.stockout
      };
      var ids ={
        id:item.orderId      
      }
      item
      if (item.stockout == 0) {
        this.$message.error("缺货数量不能为0");
      } else if (item.stockout > item.amount) {
        this.$message.error("缺货数量大于货品数量，缺货失败");
      } else {
        RoleApi.stockout(para).then(res => {
          if (!res.data.error) {
            this.$message({
              message: "更新成功",
              type: "success"
            });
            this.handleEdit(ids)
            this.getData();
          }
        });
      }
    },
    unlackBtn(item){
      let id = item.id
      var Id={
        id:item.orderId,     
      }
       RoleApi.unStockout(id).then(res =>{
         if(!res.data.error){
           this.$message({
             message:"更新成功",
             type:"success"
           })
           this.handleEdit(Id)
           this.getData();
          //  handleEdit(item)
         }
       })
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
    //点击审核时查询列表
    handleEdit(item) {
      this.dialogForm = item;
      this.dialogVisible = true;
      let para = item.id;
      this.listId=item.id
      let goodsCode=""
      let goodsName=""
      RoleApi.checkInfo(para,goodsCode,goodsName).then(res => {
        if (!res.data.error) {
          this.dialogTable = res.data.data.orderDetailList;
        }      
      });
    },
    //点击dialog中查询是调用的列表
     handleEditCheck(item) {
      this.dialogForm = item;
      this.dialogVisible = true;
      let para = item.id;
      let goodsCode=""
      let goodsName=""
      RoleApi.checkInfo(para,goodsCode,goodsName).then(res => {
        if (!res.data.error) {
          this.dialogTable = res.data.data.orderDetailList;
        }      
      });
    },
    checkDialog(id){
      let para = id;
      let goodsCode=this.DialogCheck.goodsCode
      let goodsName=this.DialogCheck.goodsName
      RoleApi.checkInfo(para,goodsCode,goodsName).then(res => {
        if (!res.data.error) {
          this.dialogTable = res.data.data.orderDetailList;
        }      
      });
    },
    subBtn(item){
      console.log(item)
      let para=item
      para.orderDetailList=this.dialogTable
      console.log(para)
      if(para.auditStatus=="未审核"){
        para.auditStatus=0
      }else if(para.auditStatus=="不通过"){
        para.auditStatus=1
      }else if(para.auditStatus=="通过"){
para.auditStatus=2
      }
      if(!para.decutFreight){
        para.decutFreight=0
      }
      if(!para.refundFreight){
        para.refundFreight=0
      }
      if(!para.supplement){
        para.supplement=0
      }
      if(!para.reductionRefund){
        para.reductionRefund=0
      }
       if(!para.serviceFee){
        para.serviceFee=0
      }
       if(!para.realPay){
        para.realPay=0
      }
      if(!para.stockFee){
        para.stockFee=0
      }
      if(!para.stockout){
        para.stockout=0
      }
      
       RoleApi.unStockoutcheck(para).then(res =>{
         console.log(res)
       })
    },
    resiteDialog(id){
      this.DialogCheck.goodsCode=""
      this.DialogCheck.goodsName=""
  let para = id;
      let goodsCode=""
      let goodsName=""
      RoleApi.checkInfo(para,goodsCode,goodsName).then(res => {
        if (!res.data.error) {
          this.dialogTable = res.data.data.orderDetailList;
        }      
      });
    },
  },
  mounted() {
    this.getData();
  }
};
</script>

<style >
#Details .el-dialog {
  margin: 50px auto 0 !important;
}
.orderTable {
  border-collapse: collapse;
  border: 1px solid rgb(37, 37, 37);
  margin: 0 auto;
}
.orderTable td {
  border: 1px solid rgb(37, 37, 37);
  min-width: 100px;
}
.titles {
  text-align: center;
}
</style>