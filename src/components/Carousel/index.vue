<template>
  <div>
    <div class="swiper-container" ref="floor2Swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
          <img :src="carousel.imgUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from 'swiper'
export default {
  name: "Carousel",
//ListContainer父组件中传入的数据开始是空，然后是非空_ _ _Floor父组件传入的数据刚开始就是非空(Home组件拿到数据遍历->Floor组件->Carousel组件)
  props:['list'],
  watch:{
      // 立即监听，不管数据有没有变化，上来就监听一次
      // 为什么watch监听不到list，因为这个数据从来没有发生变化（数据是父亲给的，父亲给的时候就是一个有数据的对象）
      list:{
        immediate:true,
        handler(){
          console.log('我正在监听Floor组件中的list数据');
           // nextTick在下次DOM更新，循环结束之后，执行延迟回调。在数据更新后立即执行这个方法，获取更新后的DOM
          this.$nextTick(()=>{
            new Swiper (this.$refs.floor2Swiper, {
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable :true,//点击小球也切换图片
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            })
          })
        }
      }
    }
};
</script>

<style scoped lang='less'>
</style>