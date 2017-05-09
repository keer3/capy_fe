import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'
import Project from '../views/Project'
import Doc from '../views/Doc'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home
    }, {
      path: '/project',
      component: Project
    }, {
      path: '/doc',
      component: Doc
    }
  ]
})
