<template>
<section>
    <div class="sidebar">
        <!-- <el-button @click="click1">乡镇项目登记列表</el-button>
         <div><el-button @click="click2">县委办项目登记列表</el-button></div>
          <div><el-button @click="click3">各局项目登记列表</el-button></div> -->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" 
            text-color="#f7f4f4" active-text-color="#fff" unique-opened router style="z-index:1200">
            <template v-for="item in menuItems">
                <template v-if="item">
                    <el-submenu :index="item.url" :key="item.url">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.list">
                            <el-submenu v-if="subItem.list" :index="subItem.url" :key="subItem.url">
                                <template slot="title">{{ subItem.name }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.list" :key="i" :index="threeItem.url">
                                    {{ threeItem.name }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.url" :key="subItem.url">
                                {{ subItem.name }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <i :class="item.icon"></i><span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
        <div class="huabiao"></div>
         <!-- <el-image
      style="width: 100px; height: 100px"
      src="../../assets/华表(1).png"
      fit="contain"></el-image> -->
    </div>
    </section>
</template>

<script>
    import bus from '../common/bus';
    import {getNavLists} from '../../api/api';
    
    export default {
        data() {
            return {
                collapse: false,
                menuItems:[]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.getNavList();
        },
        methods:{
            getNavList(){
                let para ={}
                getNavLists(para).then((res)=>{
                        this.menuItems = res.data.data;
                        localStorage.setItem("menuItems",res.data);

                    },
                    (err) => {
                    this.list = []

                    this.$message.error(err.msg);
                })
            }
        }
    }
</script>

<style>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
        font-size: 18px!important;
       /* background:#0e3c6d!important ;  */
         z-index: 1200;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
    .item.icon{color: #dad1d1}
    /* .huabiao{background:url("../../assets/华表(1).png") no-repeat  center 100% ;width: 100%;height:100%;position: absolute;bottom:0;z-index: 1000;} */
</style>
