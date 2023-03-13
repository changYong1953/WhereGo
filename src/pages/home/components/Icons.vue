<template>
<!-- 首页图标区域布局 -->
  <div class="icons">
    <swiper :options="swiperOption">
      <swiper-slide v-for="(page,index) of pages" :key="index">
        <div class="icon" v-for="item of page" :key="item.id">
          <div class="icon-img">
            <img class="icon-img-content" :src="item.imgUrl">
          </div>
          <p class="icon-desc">{{item.desc}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
export default {
  name: 'HomeIcons',
  props: {
    itemList: Array
  },
  data () {
    return {
      swiperOption: {
        autoplay: false
      }
    }
  },
  computed: {
    // 该计算属性用来计算录播图页面的数量，即应该有几张录播图。通过声明一个二维数组来保存每一页中需要轮播图片的数量
    // 通过index/8向下取整来控制轮播图的页数，index则为数组中遍历的图片的下标，然后在每页中插入8条数据，不足的插完即可。
    pages () {
      const pages = []
      this.itemList.forEach((item, index) => {
        const page = Math.floor(index / 8)
        if (!pages[page]) {
          pages[page] = []
        }
        pages[page].push(item)
      })
      return pages
    }
  }
}
</script>
<style scoped>
  /* 解决轮播分页不能在整个icons中拖动的问题 */
  .icons >>> .swiper-container{
    height: 0;
    padding-bottom: 50%;
  }
  .icons{
    margin-top: .1rem;
  }
  .icon{
    position: relative;
    overflow: hidden;
    float: left;
    width: 25%;
    padding-bottom: 25%;
    height: 0;
  }
  .icon-img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: .44rem;
  }
  .icon-img-content{
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  .icon-desc{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: .44rem;
    line-height: .44rem;
    color: #333;
    text-align: center;
    /* 当图片下面的文字较长时，我们显示前面一部分，后面的通过...来省略 */
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
