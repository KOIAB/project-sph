// search模块的小仓库
import { reqSeachInfo } from "@/api"
const state={
    searchList:{}
}
const mutations={
    SEARCHLIST(state,searchList){
        state.searchList=searchList
    }
    
}
const actions={
    // 这里可以书写业务逻辑，但是不能修改state
    async searchList({commit},params){
       let result=await reqSeachInfo(params)
       if(result.code==200){
        commit('SEARCHLIST',result.data)
       }
    }
}
// 计算属性，在项目中，为了简化数据而生
const getters={
    // state是当前仓库中的state
    // 假如网络没有网state.searchList.goodsList返回的是undifine,直接报错，至少给他一个空数组
    goodsList(state){
        return state.searchList.goodsList||[]
    },
    trademarkList(state){
        return state.searchList.trademarkList||[]
    },
    attrsList(state){
        return state.searchList.attrsList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
}