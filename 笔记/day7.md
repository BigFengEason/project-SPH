1)分页功能的实现

2)分页器展示，需要哪些数据（条件）？

需要知道当前是第几页：pageNo字段代表当前页数
需要知道每一页展示多少条数据：pageSize字段代表每页数据
需要知道分页器一共有多少条数据：total字段代表共有多少条数据
需要知道连续的页码数：continues  5|7【奇数】对称

总结：对于分页器而言，需要知道四个前提条件
pageNo：表示当前第几页
pageSize：每页多少条数据
total：总共多少条数据
continues：连续页码的个数

3)自定义分页器，在开发的时候先自己用假数据调试，功能成功以后再用服务器的数据

4)对于分页器很重要的点是，【计算出连续页码其实数字和结束数字】

5)分页器的动态展示
disabled:控制控件（表单元素）不可用(上一页、下一页)

6)开发某一产品的详情页面？

1：静态页面
当点击商品图片的时候，跳转到详情页面，在路由跳转的时候要带上商品的id

2：发请求
请求接口

3：vuex--》获取产品信息
vuex中还需要新增一个模块detail


4：动态展示组件

