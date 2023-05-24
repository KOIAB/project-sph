// search模块的小仓库
import { reqGoodInfo,reqAddOrUpdateShopCart } from "@/api"
// 封装游客身份模块uuid--->生成一个随机字符串（不能变了）
import {getUUID} from '@/utils/uuid_token'
const state={
    goodInfo:{},
    // 游客临时身份
    uuid_token:getUUID()
}
const mutations={
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    },
}
const actions={
    // 这里可以书写业务逻辑，但是不能修改state
//    获取产品信息的action
    async getGoodInfo({commit},skuId){
      let result = await reqGoodInfo(skuId)
      if(result.code == 200){
        commit('GETGOODINFO',result.data)
      }
    },

    // 将产品添加到购物车中
    async AddOrUpdateShopCart({commit},{skuId,skuNum}){
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将数据带给服务器存储，服务器写入数据成功，并没有返回其他数据，返回code==200代表成功
        let result =await reqAddOrUpdateShopCart(skuId,skuNum)
        // 当前这个函数，如果执行，返回的是Promise
        if(result.code==200){
            return 'ok'//返回的Promis是成功的，值为ok
        }else{
            return Promise.reject(new Error('fail'))//返回的Promis是失败的，值为new Error('fail')
        }
    }
}
// 计算属性，在项目中，为了简化数据而生
const getters={
    //路径导航信息数据
    categoryView(state){
        return state.goodInfo.categoryView||{}
    },
    // 产品信息数据
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    // 售卖属性数据
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}