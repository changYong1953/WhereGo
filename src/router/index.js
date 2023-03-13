import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import City from '@/pages/city/City'
import Detail from '@/pages/detail/Detail'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Home',
    component: Home
  }, {
    path: '/city',
    name: 'City',
    component: City
  }, {
    path: '/detail/:id',
    name: 'Detail',
    component: Detail
  }],
  // 问题：由于每次点击详情页的时候，页面显示都是在页面的中部，而不是在页面的页头，并且切换不同的详情页
  // 均都是显示的位置在中间位置，而不在页头位置。
  // 因此，我们使用vue-router提供的滚动行为来解决这种问题。每次做路由切换的时候，我都要先进入显示的页面，
  // x轴的初始位置是0，y轴的初始位置也是0，即让页面切换的时候，始终回到最顶部
  scrollBehavior (to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
