import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GroupTourView from '../views/GroupTourView.vue'
import FreeTourView from '../views/FreeTourView.vue'
import CruiseTourView from '../views/CruiseTourView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/group-tour', name: 'GroupTour', component: GroupTourView },
    { path: '/free-tour', name: 'FreeTour', component: FreeTourView },
    { path: '/cruise-tour', name: 'CruiseTour', component: CruiseTourView },
    { path: '/register', name: 'Register', component: RegisterView }
  ]
})

export default router
