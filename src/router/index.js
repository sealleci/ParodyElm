import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Nearby from '../components/Nearby'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        redirect: '/home/nearby'
      },
      {
        path: '/home/nearby',
        component: Nearby,
        meta: {
          keepAlive: true
        }
      },
      {
        path: '/home/other',
        component: () => require('../components/Other')
      }
    ],
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/found',
    name: 'Found',
    component: () => import('../views/Found.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('../views/Order.vue'),
    children: [
      {
        path: '',
        redirect: '/order/all'
      }, {
        path: '/order/all',
        component: () => require('../components/AllOrders')
      }, {
        path: '/order/unpaid',
        component: () => require('../components/Unpaid')
      }, {
        path: '/order/uncomment',
        component: () => require('../components/Uncomment')
      }, {
        path: '/order/refund',
        component: () => require('../components/Refund')
      }
    ]
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }, {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/login/password',
    name: 'PasswordLogin',
    component: () => import('../components/PasswordLogin.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('../views/Shop.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
