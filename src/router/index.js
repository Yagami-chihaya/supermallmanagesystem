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
    component:() =>import('../views/Home/Home.vue'),
    children:[
      {
        path:'/welcome',
        component:() =>import('../views/Home/childComponents/Welcome.vue')
      },
      {
        path:'/users',
        component:() =>import('../views/Home/childComponents/Users.vue')
      },
      {
        path:'/rights',
        component:() =>import('../views/Home/childComponents/Rights.vue')
      },
      {
        path:'/roles',
        component:() =>import('../views/Home/childComponents/Roles.vue')
      }
    ],
    redirect:'/welcome'
  },
  
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
