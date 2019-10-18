<template>
  <section>
    <el-input v-model="money" placeholder></el-input>
    <button @click="changMoney">充值</button>
  </section>
</template>

<script>
import RoleApi from "../../../api/pro";
export default {
    data(){
        return{
           money:"" ,
           
        }
    },
    methods:{
        changMoney(){
         RoleApi.deposit(this.money).then(res =>{
             if(!res.error){
              alert("申请成功！")   
             }
         })  
        }
    }
};
</script>

<style>
</style>