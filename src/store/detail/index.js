import { reqGoodsInfo , reqAddOrUpdateShopCart } from "@/api"
import { getUUID } from "@/utils/uuid_token"
const state = {
    goodInfo : {},
    // 游客临时身份证
    uuid_token:getUUID()
}
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo
    },
}
const actions = {
    // 获取产品信息的action
    async getGoodInfo({commit},skuid){
        let result = await reqGoodsInfo(skuid)
        if(result.code == 200){
            commit("GETGOODINFO",result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        let result = await reqAddOrUpdateShopCart(skuId,skuNum)
        // 加入购物车操作只是将参数带给服务器，服务器写入数据成功，并没有返回其他的数据，只是返回code=200，不用存储在仓库中
        // 当前这个函数执行后返回一个Promise
        if(result.code == 200 ){
            return '6666'
        }else{
            // 代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {
    categoryView(state){
        // state.goodInfo的初始状态是空对象，空对象的categoryView是undefined
       return state.goodInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || []
    }

}

export default {
    state,
    mutations,
    actions,
    getters
}