import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../../store'
import { getAuth } from "firebase/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        needLogin: true
      },
      component: HomeView
    },
    {
      path: '/product',
      name: 'Products',
      meta: {
        needsAuth: true
      },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/Signup.vue')
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: () => import('../views/forgotPassword.vue')
    },
    {
      path: '/:pathmatch(.*)*',
      name: '404page',
      component: () => import('../views/Pagenotfound.vue')
    }

  ]
})






router.beforeEach((to, from, next) => {
 
  const check = store.getters.getAuth
 
 // To Prevent routing to the product page  when the user is not logged in 
  if (to.meta.needsAuth) {
  if(check){
    next()
  }else{
    next("/")
  }

  } 
  else {
    next()
  }

})


router.beforeEach((to, from, next) => {
 
  const check = store.getters.getAuth
 // To Prevent routing back to the Hompage  when the user is logged in 
  
  if (to.meta.needLogin) {
    if(check === true){
      next("/product")
    }else{
      next()
    }
  
    } 
    else {
      next()
    }

})








export default router
