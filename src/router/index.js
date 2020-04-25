import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Player from '@/pages/home/cps/Player'
import Game from '@/pages/home/cps/Game'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import store from '../store'

Vue.use(Router)

const username = store.state.username

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/player',
      children: [
        {
          path: 'player',
          name: 'Player',
          component: Player,
          meta: {
            auth: true
          },
        },
        {
          path: 'game',
          name: 'Game',
          component: Game,
          meta: {
            auth: true
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (username != '') {
      next()
    } else {
      if (to.path === '/login') {
        next()
        return
      } else {
        next({
          path: '/login',
        })
      }
    }
  } else {
    next()
  }
})

export default router
