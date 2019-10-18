import http from '@/util/http'


export default {
    // 登录
    getData: params => {
        return http({
            url: "/sys/user/page/list",
            method: 'get',
            params
        })
    },
    // 保存
    save: params => {
        const data = params
        return http({
            url: "/sys/user/save",
            method: 'post',
            data
        })
    },

    // 批量删除
    batchDelete: ids => {
        const data = ids
        return http({
            url: "/sys/user/delete",
            method: 'post',
            data
        })
    },

    // 批量更改状态
    changeStatus: (userId, flag) => {
        return http({
            url: "/sys/user/delete" + flag,
            userId,
            method: 'post',
        })
    },
    resetPassword: ids => {
        const data = ids
        return http({
            url: "/sys/user/reset/password",
            method: 'post',
            data
        })
    },
    getRoleList: params => {
        return http({
                url: "/sys/role/list",
                method: 'get',
                params
            })
            // .get("/sys/role/list", params);
    },
    info: params => {
        return http({
                url: "/sys/user/info",
                method: 'get',
                params
            })
            // .get("/sys/user/info", params);
    }
}