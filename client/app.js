import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './views/App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueResource from 'vue-resource'

Vue.use(Element)
Vue.use(VueResource)
sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
