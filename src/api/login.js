import http from '@/util/http'
// export default {
//     // 登录
//     login: params => {
//         return http.post("/login", params)
//     }
// }
export function login(params) {
    const data = params
    return http({
        url: '/login',
        method: 'post',
        data
    })
}