<template>
	<!-- 实现头部的渐隐渐现效果 -->
	<div>
		<router-link class="header-abs" to="/" tag="div" v-show="showAbs">
			<div class="iconfont header-abs-back">&#xe65b;</div>
		</router-link>
		<router-link class="header-fixed" to="/" tag="div" v-show="!showAbs" :style="opacityStyle">
			{{travelDetail}}
			<div class="iconfont header-fixed-back">&#xe65b;</div>
		</router-link>
	</div>
</template>
<script>
export default {
  name: 'DetailHeader',
  data () {
    return {
      travelDetail: '景点详情',
      showAbs: true,
      opacityStyle: {
        opacity: 0
      }
    }
  },
  methods: {
    handleScroll () {
      // 只要当前页面滚动，就可以获取滚动条距离顶部的距离.当滚动条距离顶部60px时，则让固定的头部显示
      // 当距离小于60时，则不显示
      let top = document.documentElement.scrollTop
      console.log(top)
      if (top > 60) {
        let opacity = 140 / top
        opacity	= opacity > 1 ? 1 : opacity
        this.opacityStyle = { opacity }
        this.showAbs = false
      } else {
        this.showAbs = true
      }
    }
  },
  activated () {
    // 通过添加事件监听，来获取滚动条的位置。但是由于事件监听是绑定在window中的，并且是通过activated事件来触发的
    // 也就是说，只要当页面展示出现变化的时候，就会触发该事件。又该事件是绑定在window中，是一个全局的事件，因此，当
    // 在别的页面中只要页面发生改变，触发了activated，则同时也会触发此时的监听事件。此时就造成了事件的不必要执行，
    // 在首页中执行操作时，对当前该页面进行影响。
    // 所以此时我们需要对在全局中绑定的scroll事件进行解绑。当只有触发该页面时，才触发改事件。
    window.addEventListener('scroll', this.handleScroll)
  },
  // 当页面即将被隐藏或者页面即将被替换成新的页面的时候，则会触发该事件.因此通过此事件，对全局的绑定事件进行解绑
  deactivated () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="stylus" scoped>
	@import '~^@/varibles.styl'
	.header-abs
		position: absolute
		top: .2rem
		left: .2rem
		width: .8rem
		height: .8rem
		line-height: .8rem
		border-radius: .4rem
		text-align: center
		background: rgba(0, 0, 0, .3)
		.header-abs-back
			font-size: .4rem
			color: #fff
	.header-fixed
		z-index: 2
		position: fixed
		top: 0
		left: 0
		right: 0
		overflow: hidden
		height: $headerHeight
		line-height: $headerHeight
		text-align: center
		background : $bgColor
		color: #fff
		font-size: .32rem
		.header-fixed-back
			position: absolute
			top: 0
			left: 0
			width: .64rem
			text-align: center
			font-size: .4rem
			color: #fff
</style>
