import { reqSearchInfo } from "@/api"
// search模块的小仓库
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    // 获取Search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqSearchInfo函数在调用时需至少传入一个空对象 
        // params形参：是当用户派发action的时候，第二个参数传入的，至少是一个空对象
        let result = await reqSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST', result.data)
        }else{
            return Promise.reject(new Error('服务器忙，请求失败！'))
        }
    }
}
// 计算属性，在项目当中，为了简化数据而生 
// 可以把我们将来在组件当中需要用的数据简化一下【将来组件中使用就方便了】
const getters = {
    // 当前形参state，是当前仓库state
    goodsList(state) {
        // state.searchList.goodsList如果服务器数据回来了，没问题是一个数组
        // 假如网络不给力|没有网，state.searchList.goodsList就是undefined，至少返回一个空数组
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}