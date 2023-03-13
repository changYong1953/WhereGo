// 此文件用来保存vuex中的mutations中的数据

// 当mutations监听到数据发生变化，再把变化的数据更新到state共享数据中
export default {
  dataChange (state, city) {
    state.city = city
    try {
      localStorage.city = city
    } catch (error) {}
  }
}
