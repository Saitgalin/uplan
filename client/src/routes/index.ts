import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '../store';

const Login = () => import('../pages/login.vue')
const CreatePlan = () => import('../pages/create-plan.vue')
const Plans = () => import('../pages/plans.vue')


const routes: RouteRecordRaw[] = [
  {
    path: '/', name: 'Login', component: Login
  },
  {
    path: '/createPlan', name: 'CreatePlan', component: CreatePlan
  },
  {
    path: '/plans', name: 'Plans', component: Plans
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const publicPages = ['/'];

  const authRequired = !publicPages.includes(to.path);
  const auth = useAuthStore();

  if (authRequired && !auth.token) {
    return '/';
  }

})

export default router