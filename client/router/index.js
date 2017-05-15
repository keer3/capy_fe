import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home'

Vue.use(Router)

let routers = []

const indexRouter = {
  path: '/home',
  component: Home,
  children: [{
    path: '/doc',
    component: require('../views/Doc')
  }]
}

indexRouter.children.push({
  path: '/project/list',
  component: require('../views/project/ProjectList.vue')
})

indexRouter.children.push({
  path: '/project',
  component: require('../views/project/Project.vue')
})

indexRouter.children.push({
  path: '/api',
  component: require('../views/Api/Api.vue')
})

// 登录路由
const loginRoute = {
  path: '/login',
  component: require('../views/user/login.vue')
}

// 登录路由
const regRoute = {
  path: '/reg',
  component: require('../views/user/Reg.vue')
}

// 未找到页面路由
const errorRoute = {
  path: '/404',
  component: require('../views/404.vue')
}

// 重定向路由
const redirectRoute = {
  path: '*',
  redirect: '/login'
}

routers = routers.concat([indexRouter, loginRoute, regRoute, errorRoute, redirectRoute])

export default new Router({
  mode: 'history',
  routes: routers
})
