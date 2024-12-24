import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AttractionList from '../views/Page/AttractionList.vue'
import AttractionDetail from '../views/Page/AttractionDetail.vue'
import Favorites from '../views/Page/Favorites.vue'
import GroupTour from '../views/Page/GroupTour.vue'
import FreeTour from '../views/Page/FreeTour.vue'
import Flight from '../views/Page/Flight.vue'
import Hotel from '../views/Page/Hotel.vue'
import Cruise from '../views/Page/Cruise.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/list', name: 'AttractionList', component: AttractionList },
    { path: '/detail/:id', name: 'AttractionDetail', component: AttractionDetail },
    { path: '/favorites', name: 'Favorites', component: Favorites },
    { path: '/group-tour', name: 'GroupTour', component: GroupTour },
    { path: '/free-tour', name: 'FreeTour', component: FreeTour },
    { path: '/flight', name: 'Flight', component: Flight },
    { path: '/hotel', name: 'Hotel', component: Hotel },
    { path: '/cruise', name: 'Cruise', component: Cruise },
  ]
})

export default router
