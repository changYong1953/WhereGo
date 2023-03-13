<template>
<!-- 头部 -->
  <div class="header">
    <div class="header-left">
      <div class="iconfont hleft-icon">&#xe65b;</div>
    </div>
    <div class="header-input">
      <span class="iconfont">&#xe632;</span>
      输入城市/景点/游玩主题
    </div>
    <router-link to="/city">
      <div class="header-right">
      <!-- {{this.$store.state.city}} -->
      {{this.city}}
      <span class="iconfont arrow-right">&#xe601;</span>
      </div>
    </router-link>
  </div>
</template>
<script>
// vuex提供了一个简单的api，是我们可以简化this.$store.state.city的取值
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  computed: {
    // 将vuex中的数据映射到计算属性中，即将city这个vuex中共享的公用数据映射到city这个计算属性之中
    ...mapState(['city'])
  }
}
</script>
<style lang="stylus" scoped>
@import '~^@/varibles.styl'
.header
  display: flex
  line-height: $headerHeight
  background: $bgColor
  color: #fff
  .header-left
    width: .64rem
    float: left
    .hleft-icon
      text-align: center
      font-size: .4rem
  .header-input
    flex: 1
    height: .64rem
    line-height: .64rem
    background: #fff
    color: #ccc
    padding-left: .2rem
    margin: .12rem 0 0 .2rem
    border-radius: .1rem
  .header-right
    min-width: 1.04rem
    padding: 0 .1rem
    float: left
    text-align: center
    color: #fff
    .arrow-right
      margin-left: -.1rem
</style>
