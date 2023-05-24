import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"
const state={
    cartList:[]
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const actions={
    // 获取购物车数据
    async getCartList({commit}){
        let result = await reqCartList()
        if(result.code==200){
            commit('GETCARTLIST',result.data)
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuID({commit},skuId){
        let result = await reqDeleteCartById(skuId)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改购物车某一个产品选中的状态
    async updateCheckedById({commit},{skuId,isChecked}){
        let result = await reqUpdateCheckedById(skuId,isChecked)
        if(result.code=200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({dispatch,getters}){
       let PromiseAll = []
       getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked==1 ? dispatch('deleteCartListBySkuID',item.skuId) : ''
            // 将每一次返回的promis添加到数组dangzhogn
            PromiseAll.push(promise)
       })
    //    只要p1，p2...都成功返回则为成功
       return Promise.all(PromiseAll)
    },
    // 修改全部产品的状态
    updateAllCartChecked({dispatch,getters},isChecked){
        let PromiseAll=[]
        getters.cartList.cartInfoList.forEach(item=>{
            let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
            // 将每一次返回的promis添加到数组dangzhogn
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
const getters={
    cartList(state){
        return state.cartList[0]||{}
    },
}
export default {
    state,
    mutations,
    actions,
    getters,
}