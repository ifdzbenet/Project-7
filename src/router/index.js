import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Authentification from '../views/Authentification.vue'
import PostPage from '../views/SinglePostPage.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/auth',
    name: 'Authentification',
    component: Authentification
  }, 
  {
    path: '/post/:id',
    name: 'Post Page',
    component: PostPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
