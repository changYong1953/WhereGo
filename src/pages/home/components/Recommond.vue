<template>
    <div>
		<div class="title">{{hotRecommend}}</div>
		<ul>
			<router-link
			class="item border-bottom"
			v-for="item of recommendList"
			:key="item.id"
			tag="li"
			:to="'/detail/' + item.id">
				<img :src="item.imgUrl" class="item-img">
				<div class="item-info">
					<p class="item-title">{{item.title}}</p>
					<p class="item-desc">{{item.desc}}</p>
					<button class="item-button">{{seeDetail}}</button>
				</div>
			</router-link>
		</ul>
  </div>
</template>
<script>
export default {
  name: 'HomeRecommond',
  props: {
    recommendList: Array
  },
  data () {
    return {
      hotRecommend: '热点推荐',
      seeDetail: '查看详情'
    }
  }
}
</script>
<style lang="stylus" scoped>
	@import '~^@/mixins.styl'
	.title
		margin-top: .2rem
		line-height: .8rem
		background: #eee
		text-indent: .2rem
	.item
		overflow: hidden
		display: flex
		height: 1.9rem
		.item-img
			width: 1.7rem
			height: 1.7rem
			padding: .1rem
		.item-info
			flex: 1
			min-width: 0
			padding: .1rem
			.item-title
				line-height: .54rem
				font-size: .32rem
				ellipsis()
			.item-desc
				line-height: .4rem
				color: #ccc
				ellipsis()
			.item-button
				line-height: .44rem
				background: #ff9300;
				padding: 0 .2rem
				border-radius: .06rem
				margin-top: .16rem
				color: #fff
</style>
