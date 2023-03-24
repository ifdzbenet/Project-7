import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Authentification from '../views/Authentification.vue'
import PostPage from '../views/SinglePostPage.vue'
import CreatePost from '../views/CreatePost.vue'
import UpdatePost from '../views/UpdatePost.vue'
import ChangeProfile from '../views/ChangeProfile.vue'
import Configuration from '../views/Configuration.vue'


const routes = [
  // main page, with all the posts
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // authentification page, the first one you get if there is no logged user (no local storage key)
  // users log in and sign in with this page
  {
    path: '/auth',
    name: 'Authentification',
    component: Authentification
  }, 
  // Specific page for a single row (post) in the post table, taking the ID from the clicked post (home page)
  {
    path: '/post/:id',
    name: 'Post Page',
    component: PostPage
  },
  // Page where the user can create a post to be added to the post table
  {
    path: '/post/create-post',
    name: 'Create a post',
    component: CreatePost
  },
  // Page where the users that created a post, can access to their already created post and change the information in it
  {
    path: '/post/update-post/:id',
    name: 'Update a post',
    component: UpdatePost
  },
  // Page where the user can change their profile information
  {
    path: '/profile',
    name: 'Change Profile',
    component: ChangeProfile
  },
  // configuration page, where the user can change the information for: email, password and account deletion
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
