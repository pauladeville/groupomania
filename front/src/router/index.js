import Vue from 'vue'
import VueRouter from 'vue-router'
import Feed from '../views/Feed.vue';
import Login from '../views/Login.vue';
import ModifyPost from '../views/ModifyPost.vue';
import NewPost from '../views/NewPost.vue';
import SignUp from '../views/SignUp.vue';
import UserProfile from '../views/UserProfile.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/publier',
    name: 'NewPost',
    component: NewPost.vue
  },
  {
    path: '/modifier',
    name: 'ModifyPost',
    component: ModifyPost.vue
  },
  {
    path: '/profil',
    name: 'UserProfile',
    component: UserProfile.vue
  },
  {
    path: '/inscription',
    name: 'SignUp',
    component: SignUp.vue
  },
  {
    path: '/forum',
    name: 'Feed',
    component: Feed.vue
  }
]

const router = new VueRouter({
  routes
})

export default router;
