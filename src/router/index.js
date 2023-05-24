// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter)
// 引入路由配置
import routes from './routes'
// 引入store
import store from '@/store'
// 先把VueRouter原型对象上的push，先保存一下
let originPush=VueRouter.prototype.push
let originReplace=VueRouter.prototype.replace
// 重写push与replace
// 1.告诉原来push方法，你往哪里跳转(传递那参数)
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve&&reject){
        // call||apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次，第一个参数则是this指向
        // 不同点，call与apply传递非第一个参数：call传递参数逗号隔开，apply用数组传递参数
        originPush.call(this,location,resolve,reject)//改变originPush函数中的this
    }else{
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.call(this,location,resolve,reject)//改变originReplace函数中的this
    }else{
        originReplace.call(this,location,()=>{},()=>{})
    }
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior (to, from, savedPosition) {
        // 返回的y：0代表滚动条在最上方
        return {y:0}
    }
})

// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to,from,next)=>{
    // to:可以获取到跳转到哪个路由 from：可以获取到从哪个路由来的 next：放行
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    if(token){
        // 如果用户已经登录不能去login
        if(to.path=='/login'){
            next('/home')
        }else{
            // 从home到search，刷新后仓库里的信息没了，所以要发请求获取用户信息
            // 判断有没有用户信息
            if(name){
                // 有用户信息
                next()
            }else{
                try {
                    // 没有用户信息
                    // 获取用户信息在首页展示,获取成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // token失效了，清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }      
        }
    }else{
        // 未登录:不能去trade|pay|paysuccess|center|
        let toPath = to.path
        if(toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect='+toPath)
        }else{
            next()
        }
    }
})

export default router