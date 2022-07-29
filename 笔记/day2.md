犯的错误:
1:项目阶段，左侧菜单目录，只能有项目文件夹
2:联想电脑安装node_modules依赖包的时候，经常丢包。npm install --save axios --force
3：单词错误
4：路由理解



$router:进行编程式导航的路由跳转
this.$router.push|this.$router.replace
$route:可以获取路由的信息|参数
this.$route.path
this.$route.params|query
this.$route.meta


1)编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?
注意:编程式导航（push|replace）才会有这种情况的异常，声明式导航是没有这种问题，因为声明式导航内部已经解决这种问题。
这种异常，对于程序没有任何影响的。
为什么会出现这种现象:
由于vue-router最新版本3.5.2，引入了promise，当传递参数多次且重复，会抛出异常，因此出现上面现象,
第一种解决方案：是给push方法，传入相应的成功的回调与失败的回调
this.$router.push({name:"search",params:{keyword:this.keyword},query:{this.keyword.toUpperCase()}},()=>{},()=>{})
第一种解决方案可以暂时解决当前问题，治标不治本，但是以后再用push|replace还是会出现类似现象，因此我们需要从‘根’治病；

1.1)重写$router的push|replace方法
this：表示当前组件实例对象(search组件，实质是Vuecomponent实例对象)
this.$router属性：表示的是VueRouter的一个实例。在入口文件注册路由时，给每个组件身上都加了$route|$router属性
this.$router.push()方法：实际上是VueRouter这个构造函数的原型对象身上的方法（即VueRouter.prototype的方法）
VueRouter.prototype.push = function(){
     //函数的上下文为VueRouter的一个实例（即用this.$router.push()和VueRouter.prototype.push()时，函数体内的this均指向VueRouter的一个实例，故重写push|replace方法时需要将this重新指向VueRouter实例）
}
详见路由配置


2)将Home组件的静态组件拆分
2.1静态页面（样式）
2.2拆分静态组件
2.3发请求获取服务器数据进行展示
2.4开发动态业务
拆分组件：结构+样式+图片资源
一共要拆分为七个组件


3)三级联动组件完成
---由于三级联动在Home，Search、Detail中都出现了，所以我们吧三级联动组件注册为全局组件。

4)完成其余静态组件
认真处理三部分：HTML + CSS +图片资源

5)利用POSTMAN测试接口
整个项目，接口前缀都有/api



6)axios二次封装
6.1为什么进行二次封装axios？
请求拦截器、响应拦截器：请求拦截器，可以在发请求之前处理一些业务；响应拦截器，当服务器数据返回以后，可以处理一些事情

6.2在项目当中经常会有个api文件夹【一般是关于axios的】
接口当中，路径都带有/api
baseURL:"/api"

7)跨域问题
什么是跨域？协议、域名、端口号不同的请求，称之为跨域
代理跨域

8)nprogress进度条的使用
npm i nprogress
进度条颜色也可以修改，需修改他的样式文件


9)Vuex状态管理库

9.1什么是Vuex？
Vuex是官方提供的一个插件，是一个状态管理库，集中管理项目中组件供用的数据

9.2vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多，可以让Vuex实现模块式开发

10)完成TypeNav三级联动展示数据业务






AJAX:客户端可以'敲敲的'向服务器端发请求，在页面没有刷新的情况下，实现页面的局部更新。
XMLHttpRequest、$(jQuery)、fetch、axios
跨域:如果多次请求协议、域名、端口号有不同的地方，称之为跨域
JSONP、CROS、代理


2.1:工作的时候src目录下的API文件夹，一般关于axios二次封装的文件
2.2进度条：nprogress模块实现进度条功能
工作的时候，修改进度条的颜色，修改源码样式.bar类名的




4)vuex:今晚务必vuex复习一下
vuex:Vue官方提供的一个插件，插件可以管理项目共用数据。
vuex：书写任何项目都需要vuex？
项目大的时候，需要有一个地方‘统一管理数据’即为仓库store
Vuex基本使用:

     
   


















