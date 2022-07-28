1)交易页面完成

2)提交订单
2.1支付页面静态组件
2.2点击订单提交按钮的时候，还需要向服务器发送一次请求{吧支付的一些相关信息发送给服务器}
2.3项目之后不使用vuex

3)获取支付信息
3.1别在生命周期函数中async
3.2获取支付信息

4)elementUI 按需引入
npm i element-ui
按需引入
借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
首先，安装 babel-plugin-component：
npm install babel-plugin-component -D
然后，将 .babelrc 修改为：.....然后重启项目
接下来，如果你只希望引入部分组件，比如 Button 和 Select，那么需要在 main.js 中写入以下内容：

import Vue from 'vue';
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
 <el-button type="primary">主要按钮</el-button>

5)二维码生成   qrcode


6）支付业务
1.长轮训+定时器+http

7)个人中心
