// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引用 api文件夹文件
import api from './api/index.js'
// 引用utils里面工具文件
import utils from './utils/index.js'
// 将api绑定到全局
Vue.prototype.$api = api

Vue.prototype.$utils = utils

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
