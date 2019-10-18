import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import '../static/css/icon.css';
import "babel-polyfill";
import 'font-awesome/scss/font-awesome.scss'
import 'swiper/src/swiper.scss'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//     // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//     ak: 'oKsdkXefg8Nx4ixGigVHBpybyY49itiW'
// })
Vue.use(ElementUI, { size: 'small' });
// Vue.use(scroll)
Vue.use(Viewer)
Vue.prototype.$axios = axios;
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
    // Vue.prototype.$scroll = scroll
    //使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    const ms_username = localStorage.getItem('ms_username');
    // if(!role && to.path !== '/login'&& to.path!=='/vedio'){
    //     next('/login');
    // }else
    if (to.meta.permission) {
        // 鉴权
        let menuItems = localStorage.getItem('menuItems');
        console.log(menuItems);
        ms_username === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');