import Vue from 'vue'
import App from './App.vue'
// 三级联动组件--全局组件,第一个参数全局组件的名字，第二个参数哪一个组件
import TypeNav from '@/components/TypeNav'
Vue.component('TypeNav',TypeNav)
import Carousel from '@/components/Carousel'
Vue.component('Carousel',Carousel)
import Pagination from '@/components/Pagination'
Vue.component('Pagination',Pagination)
// 引入饿了么组件,注册为全局组件(挂在原型上的写法)
import { MessageBox,Button } from 'element-ui'
// Vue.component(Button.name,Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 引入mockServe.js--mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 引入lazyload插件
import VueLazyload from 'vue-lazyload'
import loading from '@/assets/loading.png'
Vue.use(VueLazyload,{
  // 懒加载默认图片
  loading: loading,
})
// 引入表单验证插件
import '@/plagins/validate'

Vue.config.productionTip = false

// 统一接收api文件夹里面全部的请函数
import * as API from  '@/api'
new Vue({
  render: h => h(App),
  // 全局事件总线bus的配置
  beforeCreate(){
    Vue.prototype.$bus=this
    Vue.prototype.$API=API
  },
  // 注册路由,kv一致省略v
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  // 注册仓库:组件实例的身上多了一个属性$store属性
  store
}).$mount('#app')
