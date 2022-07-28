import { reqCartList , reqDeleteCartById ,reqUpdateCheckedById} from '@/api'
const state = {
    cartList : [],
}

const mutations = {
    GETCARTLIST( state , cartList){
        state.cartList = cartList;
    }
}

const actions = {
    // 获取购物车列表数据
    async getCartList({commit}){
        let result = await reqCartList()
        if( result.code == 200 ){
            commit("GETCARTLIST",result.data)
            
        }else{

        }
    },
    // 删除购物车商品
    async deleteCartListBySkuId({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if( result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改商品的选中状态
    async updateCartCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if( result.code == 200 ){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除选中的商品
    deleteAllCheckedCart({dispatch,getters}){
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {
            if( item.isChecked ){
                // 如果商品的isChecked为1，则删除.每次调用dispatch返回一个promise
                let promise = dispatch('deleteCartListBySkuId',item.skuId);
                // 将每一次返回的Promise添加到数组中
                promiseAll.push(promise); 
            }
        });
        // 若promiseAll中的所有元素都成功，则结果为成功
        // 若promiseAll中有一个元素失败，则结果为失败
        return Promise.all(promiseAll)
    },
    // 修改全部产品的选中状态
    updateAllCartIsChecked({dispatch,getters},isChecked){
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach(item => { 
            // 每次调用dispatch返回一个promise
            let promise = dispatch("updateCartCheckedById",{skuId:item.skuId,isChecked});
            // 将每个promise加入数组
            promiseAll.push(promise);
        });
        return Promise.all(promiseAll)
    }
}

const getters = {
    cartList( state ){
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}