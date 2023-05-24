<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home，search是显示的，在登录，注册时是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  mounted(){
    // 优化getBaseCategoryList请求，让他只请求一次
    // 通知Vuex发请求，获取数据，储存在仓库中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
