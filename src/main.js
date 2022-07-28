import Vue from 'vue'
import App from './App.vue'
// 三级联动组件，注册为全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav)
// 轮播图组件，注册为全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页器组件，注册为全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name,Pagination)
Vue.config.productionTip = false
// 按需引入element-UI(1：注册为全局组件   2：挂在原型上)
import {Button, MessageBox} from 'element-ui'
Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入路由
import router from "@/router"
// 引入仓库
import store from "@/store"
// 引入mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 统一引入API文件夹里的所有接口函数
import * as API from '@/api'

//引入插件（图片懒加载） 
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  // 懒加载默认的图片
  loading:require('@/assets/images/1.gif')
})

// 引入表单校验插件
import '@/plugins/validate.js'

new Vue({
  render: h => h(App),
  // 安装全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    // 将API设为Vue原型对象的属性,所有组件实例都有$API
    Vue.prototype.$API = API
  },
  //注册路由
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库：组件实例身上会多出一个属性$store
  store
}).$mount('#app')
