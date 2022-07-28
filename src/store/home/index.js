import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api"

// home模块的小仓库
const state = {
    // state中默认数据别瞎写【根据接口返回值初始化】（服务器返回对象、数组就初始化空对象、空数组）
    categoryList: [],
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
}
const actions = {
    // 通过API里面的接口函数调用，想服务器发送请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            commit('CATEGORYLIST', result.data)
        }
    },
}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}