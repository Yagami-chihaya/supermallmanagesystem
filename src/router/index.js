import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  
  {
    path: '/',
    redirect:'/login',
    
  },
  {
    path:'/login',
    name: 'Login',
    component: () =>import('../views/Login/Login.vue')
  },
  {
    path:'/home',
    name:'Home',
    component:() =>import('../views/Home/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.path === '/login')return next()
  else {
    if(!window.sessionStorage.getItem('token')){return next('/login')}
    else{
      next()
    }
    
    
  }
})

export default router
