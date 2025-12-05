import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import PokemonCenterView from '../views/PokemonCenterView.vue'
import WorldMapView from '../views/WorldMapView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/pokemon-center',
    name: 'pokemon-center',
    component: PokemonCenterView,
  },
  {
    path: '/world-map',
    name: 'world-map',
    component: WorldMapView,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
