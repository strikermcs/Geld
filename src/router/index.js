import { createRouter, createWebHistory } from 'vue-router'
import firebase from 'firebase/compat/app'

  const routes = [
    {
      path: '/',
      name: 'Main',
      meta: { auth: true },
      component: () => import('../layouts/TheMainLayout.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/Home.vue')
        },

        {
          path: '/categories',
          name: 'categories',
          component: () => import('../views/Categories.vue')
        },

        {
          path: '/detail/:id',
          name: 'detail-record',
          component: () => import('../views/Detail-record.vue')
        },

        {
          path: '/history',
          name: 'history',
          component: () => import('../views/History.vue')
        },

        {
          path: '/planning',
          name: 'planning',
          component: () => import('../views/Planning.vue')
        },

        {
          path: '/profile',
          name: 'profile',
          component: () => import('../views/Profile.vue')
        },

        {
          path: '/record',
          name: 'record',
          component: () => import('../views/Record.vue')
        },

      ]
    },

    {
      path: '/user',
      name: 'Empty',
      component: () => import('../layouts/TheEmptyLayout.vue'),
      children: [
        
        {
          path: '/login',
          name: 'login',
          component: () => import('../views/Login.vue')
        },

        {
          path: '/register',
          name: 'register',
          component: () => import('../views/Register.vue')
        },
      ]

    }, 
    
  ]

 const router = createRouter({
    history: createWebHistory(),
    routes
 })


 router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (requireAuth && !currentUser){
    next('/login')
  }else{
    next()
  }
  
})


export default router