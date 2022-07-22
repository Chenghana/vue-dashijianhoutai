import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home')
      },
      {
        path: 'user-info',
        component: () => import('@/views/user/userInfo.vue')
      },
      {
        path: 'user-avatar',
        component: () => import('@/views/user/userAvatar.vue')
      },
      {
        path: 'user-pwd',
        component: () => import('@/views/user/userPwd.vue')

      },
      {
        path: 'art-cate', // 文章分类
        component: () => import('@/views/article/artCate.vue')
      },
      {
        path: 'art-list', // 文章列表
        component: () => import('@/views/article/artList')
      }
    ]
  },
  {
    path: '/reg',
    component: () => import('@/views/register/index.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/layout',
    component: () => import('@/views/layout')
  }

]

const router = new VueRouter({
  routes
})

// 白名单: 不需要携带token的api地址
const whiteList = ['/reg', '/login']
// 路由前置路由导航
router.beforeEach((to, form, next) => {
  const token = store.state.token
  if (token) {
    if (!store.state.userInfo.username) { // 本地有token值才去调用store中的getUserInfoAction方法
      store.dispatch('getUserInfoAction')
    }
    next()
  } else {
    if (whiteList.includes(to.path)) {
      // 未登录，可以访问的路由地址，则放行
      next()
    } else {
      // 强制切换到登录路径上
      next('/login')
    }
  }
})
export default router
