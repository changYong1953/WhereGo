<template>
  <div>
    <city-header></city-header>
    <!-- 城市搜索 -->
    <city-search :cities="cities"></city-search>
    <!-- 热门城市和城市列表 -->
    <city-list :hotCities="hotCities" :cities="cities" :letter="letter"></city-list>
    <!-- 右侧城市字母列表 -->
    <city-alphabet :cities="cities" @change="handleLetterChange"></city-alphabet>
  </div>
</template>
<script>
import CityHeader from './components/Header'
import CitySearch from './components/Search'
import CityList from './components/List'
import CityAlphabet from './components/Alphabet'
export default {
  name: 'City',
  data () {
    return {
      hotCities: [],
      cities: {},
      letter: ''
    }
  },
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  methods: {
    // 获取Alphabet组件传递给父组件的右侧字母列表的值
    handleLetterChange (letter) {
      this.letter = letter
    },
    // 发送请求，获取城市数据
    getCityInfo () {
      this.axios.get('/api/city.json').then(this.getCityInfoSuccess)
    },
    // 成功获取请求数据
    getCityInfoSuccess (res) {
      var result = res.data
      if (result.ret && result.data) {
        this.hotCities = result.data.hotCities
        this.cities = result.data.cities
      }
    }
  },
  mounted () {
    // 获取city数据
    this.getCityInfo()
  }
}
</script>
<style lang="stylus" scoped>
</style>
