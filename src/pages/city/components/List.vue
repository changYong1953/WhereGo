<template>
<!-- 城市列表 -->
  <div class="list" ref="wrapper">
		<div>
			<!-- 当前城市 -->
			<div class="area">
				<div class="title border-topbottom">{{currCity}}</div>
				<div class="button-list">
					<div class="button-wrapper">
						<div class="button">
							<!-- {{this.$store.state.city}} -->
							{{this.currentCity}}
						</div>
					</div>
				</div>
		</div>
		<!-- 热门城市 -->
		<div class="area">
			<div class="title border-topbottom">{{hotCiyt}}</div>
			<div class="button-list">
				<div class="button-wrapper" v-for="city of hotCities" :key="city.id" @click="handleCityChange(city.name)">
					<div class="button">{{city.name}}</div>
				</div>
			</div>
		</div>
		<!-- 城市列表 -->
		<div class="area" v-for="(city, key) of cities" :key="key" :ref="key">
			<div class="title border-topbottom">{{key}}</div>
			<div class="item-list">
				<div class="item border-bottom" v-for="item of city" :key="item.id" @click="handleCityChange(item.name)">
					{{item.name}}
				</div>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
// 引入better-scroll滚动条，其封装的是iscroll
// hotCities: 父组件传递的热门城市列表的值
// cities： 父组件传递的城市列表的值
// letter：Alphabet兄弟组件通过父组件传递过来的右侧字母列表点击获取的字母的值
import Bscroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    cities: Object,
    letter: String
  },
  data () {
    return {
      currCity: '当前城市',
      hotCiyt: '热门城市'
    }
  },
  methods: {
    handleCityChange (city) {
      this.$store.dispatch('cityChange', city)
      this.$router.push('/')
    }
  },
  computed: {
  // mpaState中映射的计算属性，可以是一个数组，也可以是以一个对象,即：把vuex中的公用数据city
  // 映射到currentCity这个计算属性之中
    ...mapState({
      currentCity: 'city'
    })
  },
  mounted () {
    // 获取整个城市列表的页面的引用，当页面数据溢出时，生成滚动条，否则不自动生成滚动条
    this.scroll = new Bscroll(this.$refs.wrapper)
  },
  watch: {
    // 当点击右侧的字母时，获取列表上对应的字母的区域，this.$refs[this.letter]获取整个区域的数组对象，
    // 数组第一个元素才是该元素对应的城市列表的html对应区域
    // this.scroll.scrollToElement:当获取到对应区域后，滚动条滚动到该区域
    letter () {
      if (this.letter) {
        const ele = this.$refs[this.letter][0]
        this.scroll.scrollToElement(ele)
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
	@import '~^@/varibles.styl'
	.border-topbottom
		&:before
			border-color: #ccc
		&:after
			border-color: #ccc
	.border-bottom
		&:before
			border-color: #ccc
	.list
		overflow: hidden
		position: absolute
		top: 1.58rem
		left: 0
		bottom: 0
		right: 0
		.title
			line-height: .54rem
			background: #eee
			padding-left: .2rem
			font-size: .26rem
			color: #666
		.button-list
			overflow: hidden
			padding: .1rem .6rem .1rem .1rem
			.button-wrapper
				float: left
				width: 33.3%
				.button
					margin: .1rem
					padding: .1rem 0
					text-align: center
					border: .02rem solid #ccc
					border-radius: .06rem
		.item-list
			.item
				line-height: .76rem
				padding-left: .2rem
</style>
