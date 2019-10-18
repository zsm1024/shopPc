import Vue from 'vue';
import Router from 'vue-router';
// import Vedio from '@/components/vedio/Index'

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children: [{
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/sysuser',
                    component: resolve => require(['../components/sys/sysuser.vue'], resolve),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/sysrole',
                    component: resolve => require(['../components/sys/sysrole.vue'], resolve),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/sysmenu',
                    component: resolve => require(['../components/sys/sysmenu.vue'], resolve),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/sysdept',
                    component: resolve => require(['../components/sys/sysdept.vue'], resolve),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/schedulejob',
                    component: resolve => require(['../components/sys/schedulejob.vue'], resolve),
                    meta: { title: '定时任务管理' }
                },
                {
                    path: '/stories',
                    component: resolve => require(['../components/page/product/stories.vue'], resolve),
                    meta: { title: '门店管理' }
                },
                {
                    path: '/shopper',
                    component: resolve => require(['../components/page/product/shopper.vue'], resolve),
                    meta: { title: '店长管理' }
                },
                {
                    path: '/premoney',
                    component: resolve => require(['../components/page/product/premoney.vue'], resolve),
                    meta: { title: '充值' }
                },
                {
                    path: '/prelist',
                    component: resolve => require(['../components/page/product/prelist.vue'], resolve),
                    meta: { title: '预存款列表' }
                },
                {
                    path: '/checkList',
                    component: resolve => require(['../components/page/product/checkPreList.vue'], resolve),
                    meta: { title: '预存款列表' }
                },
                {
                    path: '/service',
                    component: resolve => require(['../components/page/product/service.vue'], resolve),
                    meta: { title: '服务费管理' }
                },
                {
                    path: '/postlist',
                    component: resolve => require(['../components/page/product/postlist.vue'], resolve),
                    meta: { title: '快递管理' }
                },
                {
                    path: '/proname',
                    component: resolve => require(['../components/page/product/proname.vue'], resolve),
                    meta: { title: '品牌管理' }
                },
                {
                    path: '/prolist',
                    component: resolve => require(['../components/page/product/prolist.vue'], resolve),
                    meta: { title: '商品分类' }
                },
                {
                    path: '/products',
                    component: resolve => require(['../components/page/product/products.vue'], resolve),
                    meta: { title: '货品管理' }
                },
                {
                    path: '/storiesCon',
                    component: resolve => require(['../components/page/product/storiesCon.vue'], resolve),
                    meta: { title: '门店信息管理' }
                },
                {
                    path: '/cartList',
                    component: resolve => require(['../components/page/product/cartList.vue'], resolve),
                    meta: { title: '购物车管理' }
                },
                {
                    path: '/preLists',
                    component: resolve => require(['../components/page/product/preLists.vue'], resolve),
                    meta: { title: '预存款用户管理' }
                },
                {
                    path: '/unprelist',
                    component: resolve => require(['../components/page/product/unprelist.vue'], resolve),
                    meta: { title: '非预存款用户管理' }
                },


            ]
        },
        // {
        //     path: '/town',
        //     component: resolve => require(['../components/common/Home.vue'], resolve),
        //     meta: { title: '门店管理' },
        //     children: [{
        //             path: '/townList',
        //             component: resolve => require(['../components/town/townList.vue'], resolve),
        //             meta: { title: '项目登记表' }
        //         },
        //         {
        //             path: '/newlist',
        //             component: resolve => require(['../components/town/newlist.vue'], resolve),
        //             meta: { title: '新项目登记表' }
        //         },
        //         {
        //             path: '/county',
        //             component: resolve => require(['../components/county/county.vue'], resolve),
        //             meta: { title: '项目登记表' }
        //         },
        //         {
        //             path: '/unit',
        //             component: resolve => require(['../components/unit/unit.vue'], resolve),
        //             meta: { title: '项目登记表' }
        //         },
        //         {
        //             path: '/backList',
        //             component: resolve => require(['../components/unit/backList.vue'], resolve),
        //             meta: { title: '退回记录' }
        //         },
        //         {
        //             path: '/insert',
        //             component: resolve => require(['../components/unit/insert.vue'], resolve),
        //             meta: { title: '未指派列表' }
        //         },
        //         {
        //             path: '/chartList',
        //             component: resolve => require(['../components/town/chartList.vue'], resolve),
        //             meta: { title: "数据统计" }
        //         },
        //         {
        //             path: '/backListChart',
        //             component: resolve => require(['../components/town/backListChart.vue'], resolve),
        //             meta: { title: "数据分析" }
        //         },
        //         {
        //             path: '/unitChart',
        //             component: resolve => require(['../components/unit/unitChart.vue'], resolve),
        //             meta: { title: "数据分析" }
        //         },
        //         {
        //             path: '/chart',
        //             component: resolve => require(['../components/chart/chart.vue'], resolve),
        //             meta: { title: "数据分析" }
        //         },
        //         {
        //             path: '/notice',
        //             component: resolve => require(['../components/chart/notice.vue'], resolve),
        //             meta: { title: "数据分析" }
        //         },
        //     ]
        // },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        // {
        //     path: '/vedio',
        //     component: Vedio,
        //     meta: { title: '各大视频网站vip视频解析' }
        // },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
})