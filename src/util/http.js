import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'

var baseURLStr = window.g.api
axios.defaults.withCredentials = true

// if(process.env.NODE_ENV=="development"){
//   baseURLStr = process.env.BASE_API
// }
// 创建axios实例
const service = axios.create({
    baseURL: baseURLStr, // api的base_url
    timeout: 150000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
    //   if (store.getters.token) {
    //     config.headers['Authorization'] = 'Bearer ' + getToken() // getToken()让每个请求携带自定义token 请根据实际情况自行修改
    //   }  
    return config
}, error => {
    // Do something with request error
    // for debug
    Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
    response => response,
    error => {
        // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service