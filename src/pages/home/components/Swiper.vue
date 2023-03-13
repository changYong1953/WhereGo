<template>
  <!-- 首页轮播 -->
  <!--wrapper高度相对于宽度的百分比，用于解决网速较慢时轮播的抖动问题-->
  <div class="wrapper">
    <swiper :options="swiperOption" v-show="showSwiper">
      <!-- slides -->
      <swiper-slide v-for="item of swiperList" :key="item.id">
        <img class="swiper-img" :src="item.imgUrl"/>
      </swiper-slide>
      <!--用于显示轮播图下部选中时的圆点,当swiperOption配置项中的pagination的值为.swiper-pagination时，显示轮播分页-->
      <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'HomeSwiper',
  props: {
    swiperList: Array
  },
  data () {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true
      }
    }
  },
  computed: {
    showSwiper () {
      return this.swiperList.length
    }
  }
}
</script>
<style lang="stylus" scoped>
  /*由于样式通过scoped修饰的，因此直接修改分页小圆点的样式则不会生效，因此通过>>>样式穿透来修改wrapper下的分页的样式*/
  .wrapper >>> .swiper-pagination-bullet-active
    background: #fff
    /*通过设置宽高百分比来解决网速慢情况下页面的抖动问题*/
  .wrapper
    overflow: hidden
    width: 100%
    height: 0
    padding-bottom: 37.07%
    .swiper-img
      width: 100%
</style>
