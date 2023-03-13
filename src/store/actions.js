// 此文件用来保存vuex中的actions中的数据

// 当数据发生改变时，将发生改变的数据通过commit提交的dataChange事件给mutations
export default {
  cityChange (ctx, city) {
    ctx.commit('dataChange', city)
  }
}
