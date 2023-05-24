// 当前这个模块：API进行统一管理
import requests from "./request";

import mockRequest from './mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
// 发请求:axios发请求返回的是promis对象
// return接收返回的数据
export const reqCategoryList=()=>requests({url:'/product/getBaseCategoryList',method:'get'})
//获取首页轮播图数据
export const reqBannerList=()=>mockRequest({url:'/banner',method:'get'})
// 获取Floor组件数据
export const reqFloorList=()=>mockRequest({url:'/floor',method:'get'})

// 获取搜索模块数据 请求方式Post 请求地址/api/list
// 参数
/* {
    "category3Id": "61",
    "categoryName": "手机",
    "keyword": "小米",
    "order": "1:desc",
    "pageNo": 1,
    "pageSize": 10,
    "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
    "trademark": "4:小米"
  } */
//   当前这个接口，给服务器params传递参数至少是一个空对象
// post方法给服务器传递参数时，必须有或者一个空对象
  export const reqSeachInfo=(params)=>requests({url:'/list',method:'post',data:params||{}})

  // 获取商品详情数据，/api/item/{ skuId }
  export const reqGoodInfo=(skuId)=>requests({url:`/item/${skuId}`,method:'get'})

  // 将产品添加到购物车中或者更新某一个产品的个数
  export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

  // 获取购物车列表数据接口，/api/cart/cartList
  export const reqCartList = ()=>requests({url:'/cart/cartList',method:'get'})

  // 删除购物车产品的接口 /api/cart/deleteCart/{skuId}  method:delete
  export const reqDeleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

  // 修改商品选中状态 url:/api/cart/checkCart/{skuId}/{isChecked} method:get
  export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

  // 获取验证码 url:/api/user/passport/sendCode/{phone} method:get
  export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

  // 注册 url：/api/user/passport/register method:post
  export const reqUserRegister = (data) => requests({url:'/user/passport/register',data,method:'post',})

  // 登录 url:/api/user/passport/login method:post
  export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'})

  // 获取用户信息【需要带token向服务器要用户信息】 url；/api/user/passport/auth/getUserInfo method:get
  export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})

  // 退出登录 url:/api/user/passport/logout method:get
  export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})

  // 获取用户地址信息 url：/api/user/userAddress/auth/findUserAddressList method:get
  export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})

  // 获取交易页商品清单 url：/api/order/auth/trade method：get
  export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})

  // 提交订单 url:/api/order/auth/submitOrder?tradeNo={tradeNo} method:post
  export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

  // 获取支付信息 url:/api/payment/weixin/createNative/{orderId} method:get
  export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

  // 获取订单支付状态 url:/api/payment/weixin/queryPayStatus/{orderId} method:get
  export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

  // 获取我的订单列表 url:/api/order/auth/{page}/{limit} method:get
  export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})