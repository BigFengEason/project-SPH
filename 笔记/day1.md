1)要求
1.1：每一天老师书写代码务必三遍
1.2:node + webpack + VScode + 谷歌浏览器 + git
1.3:数组的方法 + promise + await + async + 模块化........

2)脚手架使用
2: vue init webpack 项目的名字
3|4：vue create 项目名称
脚手架目录:public + assets文件夹区别

node_modules:放置项目依赖的地方
public:一般放置一些共用的静态资源，打包上线的时候，public文件夹里面资源原封不动打包到dist文件夹里面
src：程序员源代码文件夹
    -----assets文件夹：经常放置一些静态资源（图片），assets文件夹里面资源webpack会进行打包为一个模块（js文件夹里面）
    -----components文件夹:一般放置非路由组件（或者项目共用的组件）
    App.vue 唯一的根组件
    main.js 入口文件【程序最先执行的文件】
babel.config.js:babel配置文件
package.json：看到项目描述、项目依赖、项目运行指令
package-lock.json：缓存性文件
README.md:项目说明文件


3)脚手架下载下来的项目稍微配置一下
3.1:浏览器自动打开
        在package.json文件中
        "scripts": {
         "serve": "vue-cli-service serve --open",
         <!-- 添加--open -->
          "build": "vue-cli-service build",
          "lint": "vue-cli-service lint"
        },

3.2关闭eslint校验工具
创建vue.config.js文件：需要对外暴露
module.exports = {
   lintOnSave:false,
}

3.3 src文件夹的别名的设置
因为项目大的时候src（源代码文件夹）：里面目录会很多，找文件不方便，设置src文件夹的别名的好处，找文件会方便一些
创建jsconfig.json文件
{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
}

5）路由的配置
vue-router
路由分为KV

5.1路由的一个分析
确定项目结构顺序:上中下 -----只有中间部分的V在发生变化，中间部分应该使用的是路由组件
2个非路由组件|四个路由组件
两个非路由组件：Header 、Footer
路由组件:Home、Search、Login（没有带有二维码的底部的Footer组件）、Register（没有带二维码的底部的Footer组件）

5.2安装路由
 cnpm install --save vue-router 
--save:可以让你安装的依赖，在package.json文件当中进行记录
5.3创建路由组件【一般放在pages文件夹】
5.4配置路由，配置完四个路由组件

6)创建非路由组件（2个：Header、Footer）

非路由组件使用分为几步:
第一步：定义
第二步：引入
第三步：注册
第四步:使用


1：安装less less-loader@5
切记less-loader安装5版本的，不要安装在最新版本，安装最新版本less-loader会报错，报的错误setOption函数未定义

2:需要在style标签的身上加上lang="less",不添加样式不生效

总结：路由组件与非路由组件的区别？
1.路由组件一般放在pages文件夹中，非路由组件一般放在components文件夹中
2.路由组件一般要在router中进行注册
3.注册完路由，不管路由组件还是非路由组件身上都有$route、$router属性

$route:一般获取路由信息【路径、query、params等】
$router:一般进行编程式导航进行路由跳转【push|replace】


7)路由的跳转
路由的跳转有两种形式：声明式导航（router-link：务必要有to属性）
                    编程式导航push||replace
编程式导航更好用：因为可以书写自己的业务逻辑

面试题：v-show与v-if区别?
v-show:通过样式display控制
v-if：通过元素上树与下树进行操作
面试题:开发项目的时候，优化手段有哪些?
1:v-show|v-if
2:按需加载

8)首页|搜索底部是有Footer组件，而登录注册是没有Footer组件
1.根据组件身上的$route获取当前路由的信息，通过路由路径$route.path=='??'来判断Footer的显示与隐藏
2.配置路由的时候，我们可以配置路由元信息【meta】，可以通过$route.meta.show来判断Footer的显示与隐藏



9）路由传参

路由跳转有几种方式？
声明式导航：router-link（务必要有to属性），可以实现路由的跳转
编程式导航：利用的是组件实例的$router.push|replace方法，可以实现路由的跳转。（可以书写一些自己的业务）

路由传参有几种方式？
params参数：路由需要占位，属于URL当中一部分

query参数：路由不需要占位，写法类似于ajax当中query参数，不属于路径当中的一部分
路由传递参数先关面试题
     1:路由传递params参数（对象写法）,path是否可以结合params参数一起使用?
     不可以：需为路由配置name属性，params中使用name而不能用path
     
     2:如何指定params参数可传可不传? 
      1)若在路由配置中为params参数占位了，但是跳转路由时没有传递params参数，则会造成跳转url错误（缺少/search）
      2)在配置路由的时候，在占位的params参数后加上一个问号，表示params参数可传可不传

     3:params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
      若params参数传递了空串，则也会造成跳转url错误（缺少/search），使用undefined解决（params:''||undefined）
      空串转为布尔为false，则或表达式直接返回第二个值undefined

     4: 路由组件能不能传递props数据?
      可以，并且有三种写法
