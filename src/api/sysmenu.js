import http from '@/util/http'


export default {

    getData: params => {
        return http({
                url: "/sys/menu/page/list",
                method: 'get',
                params
            })
            // .get("/sys/menu/page/list", params);
    },
    getTreeData: params => {
        return http({
                url: "/sys/menu/tree/menu",
                method: 'get',
                params
            })
            // .get("/sys/menu/tree/menu", params);
    },
    // 保存
    save: params => {
        const data = params
        return http({
                url: "/sys/menu/save",
                method: 'post',
                data
            })
            // .post("/sys/menu/save", params)
    },
    // 详情
    info: params => {
        return http({
                url: "/sys/menu/info",
                method: 'get',
                params
            })
            // .get("/sys/menu/info", params)
    },

    // 批量删除
    batchDelete: ids => {
        const data = ids
        return http({
                url: "/sys/menu/delete",
                method: 'post',
                data
            })
            // .post("/sys/menu/delete", ids)
    },



}