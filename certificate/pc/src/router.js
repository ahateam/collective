import Vue from 'vue'
import Router from 'vue-router'
import home from './views/home'
import login from './views/login'

const dashboard =()=>import ('./views/dashboard')

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'login',
          component: login,
      },
      {
          path:'/home',
          name:'home',
          component:home,
          children:[
              //教师
              {
                  path: '/dashboard',
                  name: 'dashboard',
                  component: dashboard
              },
             


        

          ]
      },
      {
          path:'/login',
          name:'login',
          component:login
      }


  ]
})
