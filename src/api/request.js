// 对axios进行二次封装
import axios from "axios"

// 引入nprogress进度条
import nprogress from "nprogress"
// 原型对象身上的done方法和start方法跨域控制进度条的开始和结束
// 引入nprogress样式
import "nprogress/nprogress.css"

// 在当前模块中引入store
import store from '@/store'

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.其实request就是axios，只不过是稍微配置了一下
const requests = axios.create({
    // 配置对象
    // 基础路径：发请求的时候，路径中会出现api(向/api/list发请求时，只需/list)
    baseURL: "http://gmall-h5-api.atguigu.cn/api",
    // 代表请求超时的时间5s
    timeout: 5000,
})

// 请求拦截器：发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    if( store.state.detail.uuid_token ){
        // 请求头添加一个字段：和后台老师已经商量好（不能瞎写）
        config.headers.userTempId = store.state.detail.uuid_token;
    }
    // 需要携带token给服务器
    if( store.state.user.token ){
        config.headers.token = store.state.user.token;
    }

    // 进度条开始动
    nprogress.start()
    
    // config：配置对象，对象里面有一个属性很重要，headers请求头
    return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器相应数据返回回来以后，响应拦截器可以检测到，做一些事情
    // 进度条结束
    nprogress.done()
    return res.data
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))   //终止Promise链
})


// 对外暴露
export default requests