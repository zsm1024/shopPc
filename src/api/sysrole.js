import http from '@/util/http'


export default {
    // 登录
    getData: params => {
        return http({
                url: "/sys/role/page/list",
                method: 'get',
                params
            })
            // .get("/sys/role/page/list", params);
    },
    // 保存
    save: params => {
        const data = params
        return http({
                url: "/sys/role/save",
                method: 'post',
                data
            })
            // .post("/sys/role/save", params)
    },

    // 批量删除
    batchDelete: ids => {
        const data = ids
        return http({
                url: "/sys/role/delete",
                method: 'post',
                data
            })
            // .post("/sys/role/delete", ids)
    },
    getMenuTreeData: params => {
        return http({
                url: "/sys/menu/tree/menu",
                method: 'get',
                params
            })
            // .get("/sys/menu/tree/menu", params);
    },
    getCheckMenuData: params => {
        return http({
                url: "/sys/role/menu/list",
                method: 'get',
                params
            })
            // .get("/sys/role/menu/list", params);
    },
    saveMuenPerms: params => {
        const data = params
        return http({
                url: "/sys/role/save/menu/perm",
                method: 'post',
                data
            })
            // .post("/sys/role/save/menu/perm", params);
    }


}