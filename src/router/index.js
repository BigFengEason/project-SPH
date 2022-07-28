//配置路由
import Vue from "vue";
import VueRouter from "vue-router";

// 引入配置路由
import routes from "@/router/routes"

//使用插件
Vue.use(VueRouter);

// 引入store
import store from '@/store/index'

// 重写push|replace方法
//先把VueRouter的push和replace方法保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {    //如果我们自己指定了成功/失败的回调，则自己传入
        originPush.call(this, location, resolve, reject)
        //若此时直接使用originPush()方法，则函数内的this指向window（内部代码将无法执行）。故应用call或apply方法修改this指向
    } else {    //如果我们没有指定成功/失败的回调，则自动帮我们生成，防止报错
        originPush.call(this, location, () => { }, () => { })
    }
}
// replace方法同理
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}

// 配置路由
let router =  new VueRouter({
    mode: "hash",
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        return { y: 0 }
      }
})

// 全局守卫
router.beforeEach(async (to,from,next)=>{
    // 用户登录了以后才有token
    let token = store.state.user.token;
    // 用token派发的action（reqUserInfo）获取用户信息
    let name = store.state.user.userInfo.name;
    if(token){
        // 如果用户已经登录了,还想去login。(不行，停留在首页)
        if(to.path=='/login'){
            next('/home')
        }else{
           // 如果用户已经登录，去的不是login。则需要判断有没有根据token获取了用户信息
           if(name){
            // 如果有用户信息，则放行
            next()
           }else{
            try {
                // 如果没有用户信息，可能是第一次登录，利用token派发action获取
                await store.dispatch('getUserInfo')
                next()
            } catch (error) {
                // 若利用token获取用户信息失败，则token可能已经过期，需重新登陆
                // 清除token
                store.dispatch('userLogout')
                next('/login')
            }
           }
        }
    }else{
        // 如果用户未登录，不能去交易相关、支付相关、个人中心
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            // 把未登录时想去但没有去成的信息，存储于地址栏中，登录后跳转
            next('/login?redirect='+toPath)
        }else{
            // 去的不是上面这些路由就放行
            next()
        }
    }
})


export default router;