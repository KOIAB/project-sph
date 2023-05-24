// 登录与注册仓库
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqLogout } from '@/api'
import {setToken,getToken,removeToken} from '@/utils/token'
const state = {
    code:'',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    },
    CLEAR(state){
        // 本地存储清空
        removeToken()
        state.token=''
        state.userInfo={}
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone){
        console.log(phone);
        let result = await reqGetCode(phone)
        if(result.code==200){
            commit('GETCODE',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户注册
    async userRegister({commit},user){
        let result = await reqUserRegister(user)
        if(result.code==200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 用户登录
    async userLogin({commit},data){
        let result = await reqUserLogin(data)
        // 服务器下发token，用户唯一标识符
        // 将来通过token找服务器要用户信息
        if(result.code==200){
            commit('USERLOGIN',result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        // 向服务器发请求 清除服务器的token
        let result = await reqLogout()
        if(result.code==200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters,
}