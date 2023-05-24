<template>
  <div>
    <!-- 三级联动全局组件：三级联动已近注册为全局组件了，所以不需要引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list='floor'/>
    <Brand/>
  </div>
</template>

<script>
// 引入其余组件
import ListContainer from './ListContainer/index.vue'
import Recommend from './Recommend/index.vue'
import Rank from './Rank/index.vue'
import Like from './Like/index.vue'
import Floor from './Floor/index.vue'
import Brand from './Brand/index.vue'

import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      this.$store.dispatch('floorList')
    },
    computed:{
      ...mapState({floorList:state=>state.home.floorList})
    },
}
</script>

<style scoped>

</style>