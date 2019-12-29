import Vue from 'vue'
import Router from 'vue-router'
import BaseSet from "../components/Index/index";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/base/:activeName',
      component: require('@/components/Index/index.vue').default
    },
    {
      path: '/fixlog/:activeName',
      component: require('@/components/FixLog/index.vue').default
    },
    {
      path: '/offerExcel/:activeName',
      component: require('@/components/offerExcel/index.vue').default
    },
  ]
})
