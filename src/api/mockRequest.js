// 对于axios进行二次封装
import axios from 'axios'
// 引入进度条,star:进度条开始 done：进度条结束
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'

// 1.利用axios对象的方法create，去创建一个axios实例
const requests=axios.create({
    baseURL:'/mock',
    timeout:5000,
})

requests.interceptors.request.use((config)=>{
    //config:配置对象
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