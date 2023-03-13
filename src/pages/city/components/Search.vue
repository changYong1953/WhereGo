<template>
	<div>
		<!-- 城市搜索框 -->
		<div class="search">
			<input class="input-search" v-model="keyword" type="text" :placeholder="placeholder">
		</div>
		<!-- 搜索框输入内容，下方显示搜索内容区域 -->
		<div class="search-content" ref="search" v-show="keyword">
			<ul>
				<!-- 显示匹配数据区域 -->
				<li class="search-item border-bottom" v-for="item of list" :key="item.id" @click="handleCityChange(item.name)">
					{{item.name}}
				</li>
				<!-- 显示未匹配到数据时 -->
				<li class="search-item border-bottom" v-show="hasNoData">
					{{desc}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Bscroll from 'better-scroll'
// 搜索功能实现过程：
// 1.通过父组件将cities对象中的数据传递给搜索框子组件
// 2.双向绑定搜索框中的数据keyword
// 3.监听搜索框中数据的改变
// 4.设置定时器，当搜索框中的输入发生变化时通过循环来匹配到搜索的数据
// 4.1先通过in循环来获取每个数组的下标
// 4.2通过每个下表，循环对应下标中的数组
// 4.3如果数组中存在输入框中存在的内容，不管输入拼音或者文字
// 4.4将匹配的内容存放到新的数组中
// 5.将新生成的搜索到的内容的数组赋值给list
// 6.template中循环list，将搜索到的内容在li展示出来
// 7.细节处理：
// 7.1如果输入框中没有输入内容keyword，则清空list，使原来搜索到的内容也不显示
// 7.2通过计算属性计算，如果list.length==0时，此时提示用户没有找到匹配的数据
// 7.3当搜索到的内容过多超过屏幕的时候，通过引入better-scroll滚动条组件
// 7.4此时给list的div设置ref="search"，获取整个list的div内容，生成滚动条
export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return {
      placeholder: '输入城市名或拼音',
      desc: '没有找到匹配数据',
      keyword: '',
      list: [],
      timer: null
    }
  },
  methods: {
    handleCityChange (city) {
      this.$store.dispatch('cityChange', city)
      this.$router.push('/')
    }
  },
  computed: {
    hasNoData () {
      return !this.list.length
    }
  },
  watch: {
    keyword () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (!this.keyword) {
        this.list = []
        return
      }
      this.timer = setTimeout(() => {
        const result = []
        for (let i in this.cities) {
          this.cities[i].forEach(val => {
            if (val.spell.indexOf(this.keyword) > -1 || val.name.indexOf(this.keyword) > -1) {
              result.push(val)
            }
          })
        }
        this.list = result
      }, 100)
    }
  },
  mounted () {
    this.bscroll = new Bscroll(this.$refs.search)
  }
}
</script>
<style lang="stylus" scoped>
	@import '~^@/varibles.styl'
	.search
		height: .72rem
		padding: 0 .1rem
		background: $bgColor
		.input-search
			box-sizing: border-box
			padding: 0 .1rem
			width: 100%
			height: .62rem
			line-height: .62rem
			border-radius: .06rem
			text-align: center
			color: #666
	.search-content
		overflow: hidden
		position: absolute
		top: 1.58rem
		left: 0
		bottom: 0
		right: 0
		z-index: 1
		background: #eee
		.search-item
			line-height: .62rem
			padding-left: .2rem
			color: #666
			background: #fff
</style>
