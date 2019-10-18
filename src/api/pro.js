import http from '@/util/http'
export default {
    // 保存
    save: params => {
        const data = params
        return http({
                url: "/store/save",
                method: 'post',
                data
            })
            // .post("/sys/role/save", params)
    },
    resetPassword: ids => {
        const data = ids
        return http({
            url: "/sys/user/reset/password",
            method: 'post',
            data
        })
    },
    getData: params => {
        return http({
            url: "/store/page/list",
            method: 'get',
            params
        })
    },
    //查看店长列表
    checkShopowners: params => {
        return http({
            url: "/sys/user/checkShopowners",
            method: 'get',
            params
        })
    },
    //店铺信息删除
    batchDelete: params => {
        return http({
            url: "/store/delete/" + params,
            method: 'get',
        })
    },
    //新增店长
    saveShopowner: params => {
        const data = params
        return http({
                url: "/sys/user/saveShopowner",
                method: 'post',
                data
            })
            // .post("/sys/role/save", params)
    },
    deleteShopowner: params => {
        return http({
            url: "/sys/user/deleteShopowner/" + params,
            method: 'get',
        })
    },
    // 老板充值
    deposit: params => {
        return http({
            url: "/preDeposit/deposit/" + params,
            method: 'get',
        })
    },
    //预存款审核列表
    auditingList: params => {
        return http({
            url: "/preDeposit/auditingList",
            method: 'get',
            params
        })
    },
    //充值列表
    auditing: params => {
        return http({
            url: "/preDeposit/auditing",
            method: 'get',
            params
        })
    },
    // 审核列表
    auditingOrd: params => {
        return http({
            url: "/preDeposit/auditing/" + params,
            method: 'get',

        })
    },
    checkRecord: params => {
        return http({
            url: "/preDepositRecord/checkRecord",
            method: 'get',
            params
        })
    },
    //新增服务费
    serviceFeesave: params => {
        const data = params
        return http({
                url: "/serviceFee/save",
                method: 'post',
                data
            })
            // .post("/sys/role/save", params)
    },
    //服务费列表
    serviceFeelist: params => {
        return http({
            url: "/serviceFee/page/list",
            method: 'get',
            params
        })
    },
    servicedelete: params => {
        return http({
            url: "/serviceFee/delete/" + params,
            method: 'get',
        })
    },
    //快递管理
    expressDelivery: params => {
        const data = params
        return http({
            url: "/expressDelivery/save",
            method: 'post',
            data
        })
    },
    expressDeliverylist: params => {
        return http({
            url: "/expressDelivery/page/list",
            method: 'get',
            params
        })
    },
    expressDeliverydelete: params => {
        return http({
            url: "/expressDelivery/delete/" + params,
            method: 'get',
        })
    },
    // 品牌管理
    brand: params => {
        const data = params
        return http({
            url: "/brand/save",
            method: 'post',
            data
        })
    },
    brandlist: params => {
        return http({
            url: "/brand/page/list",
            method: 'get',
            params
        })
    },
    branddelete: params => {
        return http({
            url: "/brand/delete/" + params,
            method: 'get',
        })
    },
    //商品分类

    category: params => {
        const data = params
        return http({
            url: "/category/save",
            method: 'post',
            data
        })
    },
    categorylist: params => {
        return http({
            url: "/category/page/list",
            method: 'get',
            params
        })
    },
    categorydelete: params => {
        return http({
            url: "/category/delete/" + params,
            method: 'get',
        })
    },
    category: params => {
        const data = params
        return http({
            url: "/category/save",
            method: 'post',
            data
        })
    },
    categorylist: params => {
        return http({
            url: "/category/page/list",
            method: 'get',
            params
        })
    },
    categorydelete: params => {
        return http({
            url: "/category/delete/" + params,
            method: 'get',
        })
    },
    //货品管理
    goods: params => {
        const data = params
        return http({
            url: "/goods/save",
            method: 'post',
            headers: { 'Content-Type': 'multipart/form-data; charset=utf-8' },
            data
        })
    },
    goodslist: params => {
        return http({
            url: "/goods/page/list",
            method: 'get',
            params
        })
    },
    goodsdelete: params => {
        return http({
            url: "/goods/delete/" + params,
            method: 'get',
        })
    },
    //商品图片删除
    deletePic: params => {
        return http({
            url: "/goods/deletePic/" + params,
            method: 'get',
        })
    },
    //获取所有老板
    getAllBoss: params => {
        return http({
            url: "/sys/user/getAllBoss",
            method: 'get',
            params
        })
    },
    //获取所有货品
    getAllGoods: params => {
        return http({
            url: "/goods/getAllGoods",
            method: 'get',
            params
        })
    },
    //boss配置价格
    configGoods: params => {
        const data = params
        return http({
            url: "/bossGoods/configGoods",
            method: 'post',
            data
        })
    },
    //获取商品价格列表
    bossGoodslist: params => {
        return http({
            url: "/bossGoods/page/list",
            method: 'get',
            params
        })
    },
    bossGoodsupdate: params => {
        return http({
            url: "/bossGoods/update",
            method: 'get',
            params
        })
    },
    //删除配置
    bossGoodsdelete: params => {
        return http({
            url: "/bossGoods/delete/" + params,
            method: 'get',
        })
    },
    //购物车列表
    ShoppingCart: params => {
        return http({
            url: "/shoppingCart/page/list",
            method: 'get',
            params
        })
    },
    //预存款用户查询
    orderlist: params => {
        return http({
            url: "/order/page/preList",
            method: 'get',
            params
        })
    },
    //非预存款用户列表
    unPrelis: params => {
        return http({
            url: "/order/page/unPrelist",
            method: 'get',
            params
        })
    },
     // 预存款用户
     preList: params => {
        return http({
            url: "/order/page/preList",
            method: 'get',
            params
        })
    },
    //获取服务费
        getFeeByCount: (type, count) => {
                return http({
                    url: "/serviceFee/getFeeByCount/" + type + "/" + count,
                    method: 'get',
                })
            },
            //审核中列表
            checkInfo: (params, code, name) => {
                console.log(code)
                if (!code) {
                    code = ""
                }
                if (!name) {
                    name = ""
                }
                return http({
                    url: "/order/checkInfo/" + params + "?goodsCode=" + code + "&goodsName=" + name,
                    method: 'get',
                })
            },
            //更新缺货数量
        
            stockout: params => {
                const data = params
                return http({
                    url: "/order/stockout",
                    method: 'post',
                    data
                })
            },
            //取消缺货  
            unStockout: params => {
                return http({
                    url: "/order/unStockout/" + params,
                    method: 'get',
                })
            },
            //订单提交
            unStockoutcheck: params => {
                const data = params
                return http({
                    url: "/order/check",
                    method: 'post',
                    data
                })
            },

}