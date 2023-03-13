// 此文件用来存储vuex中的state的数据

// 由于某些用户可能关闭了本地的localStorage的功能或者使用隐身模式，
// 因此此时使用localStorage会抛出异常，所以我们对localStorage做异常的处理
// 存放公共数据,当首页右上角城市切换后，我们将切换的城市的数据保存在localStorage中，当用户再次打开本页面时，
// 会优先从localStorage中查找当前选中城市的数据，如果没有，则会选择深圳
let defaultCity = '深圳'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (error) {}
export default {
  city: defaultCity
}
