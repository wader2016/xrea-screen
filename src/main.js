import Vue from 'vue'
import App from './App'
import router from './router'
import BaiduMap from 'vue-baidu-map'
import Bg from '@/base/bg/bg'
import NProgress from 'nprogress'
import axios from 'axios'
import 'nprogress/nprogress.css'
import '../static/css/reset.less'
import '../static/css/common.less'
import '../static/css/numbergd.css'
import '../static/css/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.axios = axios

Vue.use(BaiduMap, {
  ak: 'cOwhmnD7lYUX6mgFolvte1unyARGEoVe'
})
Vue.component('bg', Bg)
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})
router.afterEach(() => {
  NProgress.done()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
