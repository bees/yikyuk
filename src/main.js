import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './components/App.vue'
import Feed from './components/Feed.vue'
import Story from './components/Story.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
// import Todos from './components/Todos.vue'
import {domain} from './filters'

Vue.filter('domain', domain)

Vue.use(VueRouter)
Vue.use(require('vue-moment'))

// create Router instance
var router = new VueRouter()

Vue.config.debug = true

Vue.transition('fade', {
  enterClass: 'fadeInLeft',
  exitClass: 'fadeOutRight'
})

// add your routes and their components
router.map({
  '/': {
    component: Feed
  },
  '/comments/:id': {
    name: 'comments',
    component: Story
  },
  '/login/': {
    component: Login
  },
  '/login/:success': {
    component: Login
  },
  '/register/': {
    name: 'register',
    component: Register
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.start(App, '#app')
