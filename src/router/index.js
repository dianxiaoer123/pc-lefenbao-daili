/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden:true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '未完成订单', icon: 'dashboard', noCache: true }
     
    }]
  },
  {
    path: '/successOrder',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/successOrder/page'),
      name: 'successOrder',
      meta: { title: '成功订单', icon: 'component', noCache: true }
    }]
  },
  {
    path: '/failOrder',
    component: Layout,
    children: [{
      path: '',
      component: () => import('@/views/failOrder/page'),
      name: 'failOrder',
      meta: { title: '失败订单', icon: 'component', noCache: true }
    }]
  },
  
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  { path: '*', redirect: '/404', hidden: true }
]
