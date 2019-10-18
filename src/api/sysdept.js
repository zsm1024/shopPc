import http from '@/util/http'

// export function login(params) {
//     const data = params
//     return http({
//         url: '/login',
//         method: 'post',
//         data
//     })
// }
// export function getData(params) {
//     return http({
//         url: '/sys/dept/page/list',
//         method: 'get',
//         params
//     })
// }
// export function getTreeData(params) {
//     return http({
//         url: '/sys/dept/tree/dept',
//         method: 'get',
//         params
//     })
// }
// export function getTreeData(params) {
//     return http({
//         url: '/sys/dept/tree/dept',
//         method: 'get',
//         params
//     })
// }
// export function save(params) {
//     return http({
//         url: '/sys/dept/save',
//         method: 'get',
//         params
//     })
// }

// export function info(params) {
//     return http({
//         url: '/sys/dept/save',
//         method: 'get',
//         params
//     })
// }
// export function batchDelete(params) {
//     return http({
//         url: '/sys/dept/info',
//         method: 'get',
//         params
//     })
// }
export default {

    getData: params => {
        return http({
            url: '/sys/dept/page/list',
            method: 'get',
            params
        })
    },
    getTreeData: params => {
        return http({
                url: '/sys/dept/tree/dept',
                method: 'get',
                params
            })
            // .get("/sys/dept/tree/dept", params);
    },
    // 保存
    save: params => {
        const data = params
        return http({
                url: '/sys/dept/save',
                method: 'post',
                data
            })
            // .post("/sys/dept/save", params)
    },
    // 详情
    info: params => {
        return http({
                url: '/sys/dept/info',
                method: 'get',
                params
            })
            // .get("/sys/dept/info", params)
    },

    // 批量删除
    batchDelete: ids => {
        const data = ids
        return http({
                url: '/sys/dept/delete',
                method: 'post',
                data
            })
            // .post("/sys/dept/delete", ids)
    },


}