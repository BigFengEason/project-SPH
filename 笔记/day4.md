1)开发Search模块中的TypeNav模块的过渡效果
过渡动画前提：组件必须要有v-if|v-show指令才可以进行过渡动画

2)TypeNav三级联动性能优化?
项目：home切换到search或者search切换到home，你会发现一件事情，组件在频繁的向服务器发请求，
获取三级联动的数据进行展示。

项目中如果频繁的向服务器发请求，很耗性能的，因此咱们需要进行优化。

2.1为什么会频繁的向服务器发请求获取三级联动的数据呢?
因为路由跳转的时候，组件会进行销毁的，在新组件中重新挂载TypeNav，执行mounted向服务器发请求
只需要发一次请求，获取到三级联动的数据即可，不需要多次。
最终解决方案：在App组件的mounted中执行请求(this.$store.dispatch("categoryList");)，因为App组件只会被挂载一次

3)合并params和query参数
三级联动的a标签可以跳转Search组件（带有query参数）。头部的搜索按钮也可以跳转Search组件（带有params参数）。
跳转后需保证query和params参数均不会丢失。添加到location对象中

4)开发home首页当中的ListContainer组件与Floor组件
服务器（接口）返回的数据，只有商品分类、菜单分类数据。对于ListContainer组件与Floor组件的数据，服务器没有提供给我们

mock数据（模拟数据）:如果你想mock数据，需用到一个插件mockjs     http://mockjs.com/  官方地址

使用步骤：
1)在项目当中src文件夹下创建mock文件夹
2)准备JSON数据(在mock文件夹中创建相应的JSON文件)
3)把mock需要的数据放在public文件夹中【public文件夹在打包时会原封不动的打包到dist文件夹】
4)创建mockServe.js文件，通过mockjs插件实现模拟数据
5)mockServe.js文件在入口文件引入（至少需要执行一次，才能模拟数据）

5)ListContainer组件开发重点？
1.安装swiper插件：swiper5版本（npm i swiper@5）
2.引包（响应js|css）
3.页面中必须有结构
4.创建swiper实例，为其添加行为（官方文档）

创建swiper实例应在相应结构挂载后执行，即创建实例的代码写在mounted中，实验证明不行。因为我们的结构是向服务器请求获得的
而发送ajax请求（即mounted中的dispatch）属于异步语句，导致v-for遍历的时候结构还没有完整，故创建实例也没有效果
解决方法：
一）将new Swiper放在updated中。（不推荐，如果组件有很多响应式（data），只要有一个属性值发生变化updated还会再次执行，再次初始化实例。）
二）将new Swiper放在一个定时器中，将此部分代码也推入异步执行队列，保证服务器数据返回之后，再创造实例
但是这种解决方案存在风险（无法确定用户请求到底需要多长时间），因此没办法确定延迟器时间。