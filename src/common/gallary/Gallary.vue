<template>
  <div class="container" @click="handleGallaryClick">
		<div class="wrapper">
			<swiper :options="swiperOption">
				<swiper-slide v-for="(item, index) in imgs" :key="index">
					<img class="gallary-img" :src="item"/>
				</swiper-slide>
				<!--用于显示轮播图下部选中时的圆点,当swiperOption配置项中的pagination的值为.swiper-pagination时，显示轮播分页-->
				<div class="swiper-pagination" slot="pagination"></div>
      </swiper>
		</div>
	</div>
</template>
<script>
export default {
  name: 'CommonGallary',
  props: {
    imgs: Array
  },
  data () {
    return {
      // 此处swiper的版本为4的版本
      // 刚开始，gallary处于隐藏状态，当我们点击图片让它显示的时候，它需要重新计算它的高宽，因此轮播图切换的时候会发生卡滞
      // 且轮播的下标分页也显示错误,显示不正确。此时需要通过observer和observeParents这恋歌属性来解决。
      // 即：我这个swiper插件只要监听到我这个元素，或者我这个父元素发生改变时（dom结构变化），那么我这个swiper插件
      // 就会自动刷新一次，通过自动刷新就解决了这个宽度计算的问题。
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction'
        },
        observer: true,
        observeParents: true
      }
    }
  },
  methods: {
    // 当我手指只是触发图片的移动操作时，不会触发点击操作。当我手指点击图片所在的div时，则触发点击事件
    // 通过触发close时间，将该时间传递给父组件。当父组件接受到该时间后，会将当前页面通过v-show来隐藏该页面
    handleGallaryClick () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="stylus" scoped>
	.wrapper >>> .swiper-container
		overflow: inherit
	.container
		display: flex
		flex-direction: column
		justify-content: center
		z-index: 99
		position: fixed
		top: 0
		left: 0
		bottom: 0
		right: 0
		background: #000
		.wrapper
			height: 0
			width: 100%
			padding-bottom: 66.625%
			.gallary-img
				width: 100%
			.swiper-pagination
				color: #fff
				bottom: -1rem
</style>
