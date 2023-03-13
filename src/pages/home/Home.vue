<template>
  <div>
    <!-- 首页头部输入框 -->
    <home-header></home-header>
    <!-- 首页轮播图 -->
    <home-swiper :swiperList="swiperList"></home-swiper>
    <!-- 首页图标区域 -->
    <home-icons :itemList="itemList"></home-icons>
    <!-- 首页热点推荐区域 -->
    <home-recommond :recommendList="recommendList"></home-recommond>
    <!-- 首页星期去哪儿区域 -->
    <home-weekend :weekendList="weekendList"></home-weekend>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import HomeHeader from './components/Header'
import HomeSwiper from './components/Swiper'
import HomeIcons from './components/Icons'
import HomeRecommond from './components/Recommond'
import HomeWeekend from './components/Weekend'
export default {
  name: 'Home',
  data () {
    return {
      lastCity: '',
      swiperList: [],
      itemList: [],
      recommendList: [],
      weekendList: []
    }
  },
  components: {
    HomeHeader,
    HomeSwiper,
    HomeIcons,
    HomeRecommond,
    HomeWeekend
  },
  computed: {
    // 当切换城市时，在vuex中获取对应的城市的值
    ...mapState(['city'])
  },
  methods: {
    // 发送获取首页数据的ajax请求
    getHomeInfo () {
      // 此时的api经过配置转发后会被替换为/static/mock
      this.axios.get('/api/index.json?city=' + this.city).then(this.getHomeInfoSuccess)
    },
    // 获取首页请求数据
    getHomeInfoSuccess (res) {
      res = res.data
      // 如果后端返回的结果正确，且返回的结果补位空
      if (res.ret && res.data) {
        const data = res.data
        this.swiperList = data.swiperList
        this.itemList = data.itemList
        this.recommendList = data.recommendList
        this.weekendList = data.weekendList
      }
    }
  },
  mounted () {
    this.lastCity = this.city
    this.getHomeInfo()
  },
  // 当是使用keep-alive时，会新增一个activated生命周期函数，当页面重新被显示的时候，activated会重新执行，即：当我们首次进入首页时该方法会被
  // 执行，当我们从城市选择页面切换会首页时，首页重新加载时，也会被重新执行。由于返回时的数据时从内存中获取的，因此mounted不会被执行。所以此时
  // 的mouted的钩子函数会造成一个问题：切换到不同的城市时，首页不会加载不同的ajax请求
  // 此时，我们需要实现的功能为：当当前城市和缓存在lastCity中的城市不相等时，说明不是相同的请求，此时需要重新发送ajax请求，加载页面数据。
  activated () {
    if (this.city !== this.lastCity) {
      this.lastCity = this.city
      this.getHomeInfo()
    }
  }
}
</script>
<style scoped>

</style>
