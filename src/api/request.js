// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条,star:进度条开始 done：进度条结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// 在当前模块中引入store仓库
import store from '@/store'
// 配置环境
const $axios = function(){
    let apiUrl=null
    if(process.env.VUE_APP_ENV=='dev'){
        apiUrl='/api'
    }
    if(process.env.VUE_APP_ENV=='pro'){
        apiUrl='http://gmall-h5-api.atguigu.cn/api'
    }
    return apiUrl
}

// 1.利用axios对象的方法create，去创建一个axios实例
const requests=axios.create({
    baseURL:$axios(),
    timeout:5000,
})
requests.interceptors.request.use((config)=>{
    //config:配置对象
    if(store.state.detail.uuid_token){
        // 给请求头添加一个字段：和后台商量好了
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    // 进度条开始
    nprogress.start()
    return config
})
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nprogress.done()
    return res.data
},(error)=>{
    return Promise.reject(new Error('faile'))
})
export default requests