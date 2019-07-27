import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const loadView = (view) => {
  return () => import(`@/views/${view}.vue`)
};

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: loadView('Home')
    },
    {
      path: '/new',
      name: 'new',
      component: loadView('New')
    },
    {
      path: '/browse',
      name: 'browse',
      component: loadView('Browse')
    }
  ]
})
