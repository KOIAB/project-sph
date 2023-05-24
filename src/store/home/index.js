import { reqCategoryList,reqBannerList,reqFloorList } from "@/api"
// home模块的小仓库
// state:仓库存储数据的地方
const state={
    // 服务器返回的是个数组，默认初始值别瞎写，【根据接口的返回值去初始化】
    // 三级菜单数据
    categoryList:[],
    // 轮播图数据
    bannerList:[],
    floorList:[]
}
// mutations:修改state的唯一手段
const mutations={
    CATEGORYLIST(state,categoryList){
        state.categoryList=categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList=bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList=floorList
    }
}
// actions:处理action，可以书写一些逻辑，也可以处理异步
const actions={
    // 这里可以书写业务逻辑，但是不能修改state
    async categoryList({commit}){
        // 通过API里面的接口函数调用，向服务器发请求，获取服务器数据
       let result=await reqCategoryList()
       if(result.code==200){
        commit('CATEGORYLIST',result.data)
       }
    },

    // 获取首页轮播图的数据
    async bannerList({commit}){
        let result=await reqBannerList()
        if(result.code==200){
            commit('BANNERLIST',result.data)
        }
    },
    // 获取首页floor轮播图的数据
    async floorList({commit}){
        let result=await reqFloorList()
        if(result.code==200){
            commit('FLOORLIST',result.data)
        }
    }
}
// getters:理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加方便
const getters={

}
export default {
    state,
    mutations,
    actions,
    getters,
}