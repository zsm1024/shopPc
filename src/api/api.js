import http from '@/util/http'
export function login(params) {
    const data = params
    return http({
        url: '/login',
        method: 'post',
        data
    })
}
export function getDashboardContent(params) {
    return http({
        url: '/dashboard',
        method: 'get',
        params
    })
}
export function getNavLists(params) {
    return http({
        url: '/sys/menu/nav',
        method: 'get',
        params
    })
}
export default {
    getDataList: params => {
        return http({
                url: "/item/page/list",
                method: 'get',
                params
            })
            // .get("/sys/role/page/list", params);
    },
    gettownDataList: params => {
        return http({
                url: "/item/town/page/list",
                method: 'get',
                params
            })
            // .get("/sys/role/page/list", params);
    },
    getstatueList: params => {
        return http({
            url: "/sys/dict/getByType/" + params,
            method: 'get',
        })
    },
    itemSave: params => {
        const data = params
        return http({
            url: "/item/save",
            method: 'post',
            data
        })
    },
    getAcceptanceOrgan: params => {
        return http({
                url: "/item/getAcceptanceOrgan/" + params,
                method: 'get',
            })
            // .get("/sys/role/page/list", params);
    },
    countyOperation: params => {
        const data = params
        return http({
            url: "/item/countyOperation",
            method: 'post',
            data
        })
    },
    backItem: params => {
        const data = params
        return http({
            url: "/item/backItem",
            method: 'post',
            data
        })
    },
    dealItem: params => {
        const data = params
        return http({
            url: "/item/dealItem",
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
            data
        })
    },
    getTrace: params => {
        return http({
            url: "/trace/getTrace/" + params,
            method: 'get',
        })
    },
    selectUnPointItems: params => {
        return http({
            url: "/item/selectUnPointItems",
            method: 'get',
            params
        })
    },
    extract: params => {
        const data = params
        return http({
            url: "/item/extract",
            method: 'post',
            data
        })
    },
    backList: params => {
        return http({
            url: "/item/backList",
            method: 'get',
            params
        })
    },
    statistics: params => {
        return http({
            url: "/statistics/getByTime/" + params,
            method: 'get',
        })
    },
    getByCategory: params => {
        return http({
            url: "/statistics/getByCategory/" + params,
            method: 'get',
        })
    },
    getByCategoryAll: params => {
        return http({
            url: "/statistics/getByCategory",
            method: 'get',
            params
        })
    },
    getDealCountByTime: params => {
        return http({
            url: "/statistics/getDealCountByTime/" + params,
            method: 'get',
        })
    },
    getXianCountByTime: params => {
        return http({
            url: "/statistics/getXianCountByTime/" + params,
            method: 'get',
        })
    },
    getJuCountByTime: params => {
        return http({
            url: "/statistics/getJuCountByTime/" + params,
            method: 'get',
        })
    },
    //各局项目统计
    getScreenJuCount: params => {
        return http({
            url: "/statistics/getScreenJuCount",
            method: 'get',
            params
        })
    },
    //各乡镇
    getScreenZhenCount: params => {
        return http({
            url: "/statistics/getScreenZhenCount",
            method: 'get',
            params
        })
    },
    //新闻列表
    getNewsList: params => {
        return http({
            url: "/statistics/getList/"+params,
            method: 'post',
        })
    },
    //
    getTotalCount: params => {
        return http({
            url: "/statistics/getTotalCount",
            method: 'get',
            params
        })
    },
    //查询受益人群
    getByBeneficiaries: params => {
        return http({
            url: "/statistics/getByBeneficiaries",
            method: 'get',
            params
        })
    },
    //大屏展示第一层
    getListByCondition: params => {
        return http({
            url: "/item/page/getListByCondition",
            method: 'get',
            params
        })
    },
    getVillages: params => {
        return http({
            url: "/item/getVillage",
            method: 'get',
            params
        })
    },
    //获取所有乡镇
    selectAllTown: params => {
        return http({
            url: "/item/selectAllTown",
            method: 'get',
            params
        })
    },
    getVillageByTown: params => {
        return http({
            url: "/item/getVillageByTown/" + params,
            method: 'get',
        })
    },
    checkPic: params => {
        return http({
            url: "/item/checkPic/" + params,
            method: 'get',
        })
    },
    changPwd: params => {
        const data = params
        return http({
            url: "/change/password",
            method: 'post',
            data
        })
    }
}