1)个人中心完成

2）全局守卫
未登录时访问：交易相关（trade），支付相关（pay success）、用户中心（center）等跳转到登录页面
// 把未登录时想去但没有去成的信息，存储于地址栏中，登录后跳转
// 登录的路由组件：看当前路由中是否有query参数。有：跳到query参数指定的路由。没有：跳到home

3)路由独享守卫
只有从购物车界面才能跳转到交易页面（创建订单）
只有从交易页面才能跳到支付页面
只有从支付页面才能跳转到支付成功页面
路由守卫中：next(false):从哪来回哪去

组件内守卫

4)图片懒加载
vue-lazyload

Vue插件：一定暴露一个对象，这个对象必须得有个install方法

5）！！！表单验证   vee-validate 使用
第一步：
建议安装2版本的：   npm i vee-validate@2
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)


第二步：提示信息
VeeValidate.Validator.localize('zh_CN', {
messages: {
...zh_CN.messages,
is: (field) => `${field}必须与密码相同` // 修改内置规则的 message，让确认密码和密码相同
},
attributes: { // 给校验的 field 属性名映射中文名称
phone: '手机号',
code: '验证码',
password:'密码',
password1:'确认密码',
isCheck:'协议'
}
})

第三步：基本使用
<input
          placeholder="请输入你的手机号"
          v-model="phone"
          name="phone"
          v-validate="{ required: true, regex: /^1\d{10}$/ }"
          :class="{ invalid: errors.has('phone') }"
        />
<span class="error-msg">{{ errors.first("phone") }}</span>

const success = await this.$validator.validateAll(); //全部表单验证
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
validate: value => {
return value
},
getMessage: field => field + '必须同意'
})


6）路由懒加载
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
# import ('index.vue') 用import括号引入vue文件，会返回一个promise
而路由中可以用component配置接收一个返回 Promise 组件的函数，Vue Router 只会在第一次进入页面时才会获取这个函数，然后使用缓存数据。这意味着你也可以使用更复杂的函数，只要它们返回一个 Promise ：

即路由中component的值可以是一个函数，函数返回promise组件，可以使得Vue Router按需加载，而不是一开始就import一堆组件

7）打包上线
npm run build
项目打包之后，代码都是经过压缩、加密的。如果运行时报错，输出的错误信息是无法准确得知是哪一行的代码报错
有了map就可以像未加密的代码一样，准确的找到是哪一行代码报错
如果该文件项目不需要（上线）可以去掉，减少体积
vue.config.js配置
productionSourceMap:false