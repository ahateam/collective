import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home.vue'
import customer from '../views/customer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  },
  {
    path:'/customer',
    name:'customer',
    component:customer
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
