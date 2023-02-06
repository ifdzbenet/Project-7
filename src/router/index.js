import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Authentification from '../views/Authentification.vue'
import PostPage from '../views/SinglePostPage.vue'
import CreatePost from '../views/CreatePost.vue'
import UpdatePost from '../views/UpdatePost.vue'
import TopicPage from '../views/TopicView.vue'


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
    path: '/topic/:id',
    name: 'Topic Page',
    component: TopicPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
