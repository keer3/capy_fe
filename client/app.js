import Vue from 'vue'
import {
  sync
} from 'vuex-router-sync'
import App from './views/App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import VueCookie from 'vue-cookie'

import 'element-ui/lib/theme-default/index.css'
import './assest/style/normalize.css'
import './assest/style/common.css'

import VueResource from 'vue-resource'

Vue.use(Element)
Vue.use(VueResource)
Vue.use(VueCookie)

Vue.http.interceptors.push((request, next) => {
  request.credentials = true
  next()
})

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export {
  app,
  router,
  store
}
