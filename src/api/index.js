// 当前这个模块：对API接口进行统一管理
// 引入二次封装的axios（带有请求、响应拦截器）
import requests from "./request"
import mockRequests from "./mockAjax"
// 三级联动接口
// /api/product/getBaseCategoryList     get     无参数

// 发请求:axios发请求返回的是个Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequests({ url: '/banner', method: 'get' })

// 获取floor数据
export const reqFloorList = () => mockRequests({ url: '/floor', method: 'get' })

// 获取Search模块数据    请求地址:/api/list     请求方式:POST       参数：需要带参数
/*  参数实例
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
// 当前这个函数需要接收外部传递参数,给服务器传递一个默认参数（至少是一个空对象）
export const reqSearchInfo = (params) => requests({ url: '/list', method: 'post', data: params })

// 获取产品详情信息的接口  url:/api/item/{ skuId }    方式：GET       
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

// 将产品添加到购物车中（或者更新某一产品的个数）
// url : /api/cart/addToCart/{ skuId }/{ skuNum }   方式：POST
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 获取购物车数据列表接口
// url：/api/cart/cartList    get
export const reqCartList = () => requests({ url:'/cart/cartList' , method:'get' })

// 删除购物车商品的接口
// url：/api/cart/deleteCart/{skuId}   方式：DELETE
export const reqDeleteCartById = (skuId) => requests({ url:`/cart/deleteCart/${skuId}` , method:'delete'})

// 修改商品的选中状态的接口
// url: /api/cart/checkCart/{skuId}/{isChecked}   方式：GET
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 获取验证码的接口
// url:/api/user/passport/sendCode/{phone}    方式：GET
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 注册用户的接口
// url:/api/user/passport/register    方式：POST    参数：phone password code
export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post'})

// 用户登录的接口
// url：/api/user/passport/login    方式：POST    参数:phone password
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

// 获取用户信息【需要带着用户的token向服务器要数据】
// url：/api/user/passport/auth/getUserInfo  方式：GET
export const reqUserInfo = () => requests({url:'/user/passport/auth/getUserInfo',method:'get'}) 

// 退出登录的接口
// url：/api/user/passport/logout  方式：GET
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'})

// 获取用户地址信息
// url:/api/user/userAddress/auth/findUserAddressList   方式：GET
export const reqAddressInfo = () => requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

// 获取订单交易页信息
// url:/api/order/auth/trade    方式：GET
export const reqOrderInfo = () => requests({url:'/order/auth/trade',method:'get'})

// 提交订单的接口
// url：/api/order/auth/submitOrder?tradeNo={tradeNo}  方式：POST
// 参数：traderNo consignee consigneeTel deliveryAddress paymentWay orderComment 字符 orderDetailList 数组
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 获取订单支付信息的接口
// url:/api/payment/weixin/createNative/{orderId}  方式：GET
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 查询订单支付状态的接口
// url：/api/payment/weixin/queryPayStatus/{orderId}  方式：GET
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 获取个人中心我的订单接口
// url：/api/order/auth/{page}/{limit}  方式：GET
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'}) 