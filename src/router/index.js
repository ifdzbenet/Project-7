import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Authentification from '../views/Authentification.vue'
import PostPage from '../views/SinglePostPage.vue'
import CreatePost from '../views/CreatePost.vue'
import UpdatePost from '../views/UpdatePost.vue'
import ChangeProfile from '../views/ChangeProfile.vue'
import Configuration from '../views/Configuration.vue'


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
  },
  {
    path: '/post/create-post',
    name: 'Create a post',
    component: CreatePost
  },
  {
    path: '/post/update-post/:id',
    name: 'Update a post',
    component: UpdatePost
  },
  {
    path: '/profile',
    name: 'Change Profile',
    component: ChangeProfile
  },
  {
    path: '/configuration',
    name: 'Configuration',
    component: Configuration
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
