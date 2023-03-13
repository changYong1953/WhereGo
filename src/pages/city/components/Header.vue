<template>
<!-- 城市头列表 -->
  <div class="header">
    {{citySelect}}
    <router-link to="/">
      <div class="iconfont header-back">&#xe65b;</div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'CityHeader',
  data () {
    return {
      citySelect: '城市选择'
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~^@/varibles.styl'
  .header
    position: relative
    overflow: hidden
    height: $headerHeight
    line-height: $headerHeight
    text-align: center
    background : $bgColor
    color: #fff
    font-size: .32rem
    .header-back
      position: absolute
      top: 0
      left: 0
      width: .64rem
      text-align: center
      font-size: .4rem
      color: #fff
</style>
