<template>
  <!-- 侧边字母列表 -->
  <div>
    <ul class="list">
      <li
        class="item"
        v-for="item of letters"
        :key="item"
        :ref="item"
        @click="handleLetterClick"
        @touchstart.prevent="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >{{item}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      touchStatus: false,
      startY: 0,
      timer: null
    }
  },
  updated () {
    // 获取字母A的Y方向的位置，因为A的位置是固定的，所以当数据发生改变，页面重新渲染时，才获取A的位置，因此，不管
    // 屏幕是否触发点击事件，与A此时的位置无关。所以，我们在此处来获取A的位置坐标
    this.startY = this.$refs['A'][0].offsetTop
  },
  computed: {
    letters () {
      const letters = []
      for (let i in this.cities) {
        letters.push(i)
      }
      return letters
    }
  },
  methods: {
    // 为右侧每个字母绑定点击事件
    // e.target.innerText:获取的每个字母，通过事件向上触发，最终传递给list兄弟组件
    handleLetterClick (e) {
      this.$emit('change', e.target.innerText)
    },
    // 当手指触摸时，touchStatus开启触摸
    handleTouchStart () {
      this.touchStatus = true
    },
    // 当手指在触摸屏移动的过程中
    // 1.如果是可触摸状态，先获取A的li到输入框之间的距离
    // 2.在获取手指在屏幕移动时距离屏幕最上端的距离，减去头部和搜索框的高度
    // 3.用触摸的高度减去A的距离，就是手指触摸点到A之间的距离
    // 4.用两个之间的距离除以每个li的高度，就是手指点击右侧字母的位置
    // 5.通过事件向上触发，给父组件，然后通过父组件将值传递给List组件，来显示点击字母的区域
    // 6.性能优化：当触屏事件发生时，由于事件触发的频率很高，因此我们通过一个一次性定时器来实现节流的效果
    // 即：当在100ms内再次触发这个事件时，我们清除定时器，在重新开始一个新的定时器，避免用户重复操作，达到节流作用
    handleTouchMove (e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index <= this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    },
    // 当手指触摸结束时，关闭触摸
    handleTouchEnd () {
      this.touchStatus = false
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~^@/varibles.styl';

.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 1.58rem;
  right: 0;
  bottom: 0;
  width: 0.4rem;

  .item {
    line-height: 0.4rem;
    text-align: center;
    color: $bgColor;
  }
}
</style>
