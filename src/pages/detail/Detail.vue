<template>
  <div>
		<detail-banner
    :sightName="sightName"
    :bannerImg="bannerImg"
    :gallaryImgs="gallaryImgs"></detail-banner>
    <detail-header></detail-header>
		<div class="content">
      <detail-list :list="categoryList"></detail-list>
    </div>
	</div>
</template>
<script>
import DetailBanner from './components/Banner'
import DetailHeader from './components/Header'
import DetailList from './components/List'
export default {
  // name属性的作用：①当我们需要对页面使用递归组件的时候需要使用  ②当我们需要使当前页面不缓存的时候使用
  // ③当我们使用vue调试工具的时候，显示的对应的组件名就是定义的name的名字
  name: 'Detail',
  components: {
    DetailBanner,
    DetailHeader,
    DetailList
  },
  data () {
    return {
      sightName: '',
      bannerImg: '',
      categoryList: [],
      gallaryImgs: []
    }
  },
  methods: {
    getDetailInfo () {
      this.axios.get('api/detail.json?', {
        params: {
          id: this.$route.params.id
        }
      }).then((res) => {
        let result = res.data
        if (result.ret && result.data) {
          let data = result.data
          this.sightName = data.sightName
          this.bannerImg = data.bannerImg
          this.categoryList = data.categoryList
          this.gallaryImgs = data.gallaryImgs
        }
      })
    }
  },
  mounted () {
    this.getDetailInfo()
  }
}
</script>
<style lang="stylus" scoped>
  .content
    height: 50rem
</style>
