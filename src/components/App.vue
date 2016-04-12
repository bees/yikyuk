<template lang="jade">
div
  .ui.top.attached.menu
    .ui.container
      a(v-link="'/'").item
        h1 YikYuk
      .ui.right.menu
        a(v-if="loggedIn", @click="logout").item
          | Logout
        a(v-else, v-link="'/login'").item
          | Login

  router-view(transition="fade", transition-mode="out-in", keep-alive).view.animated

</template>

<script>
import store from '../store'
import Firebase from 'firebase'
const api = new Firebase('https://torrid-inferno-4476.firebaseio.com/')

// Vue.transition('fade', {
//   enterClass: 'fadeInLeft',
//   exitClass: 'fadeOutRight'
// })

export default {
  data () {
    return {
      query: '',
      loggedIn: store.loggedIn
    }
  },
  methods: {
    doAlert: function (m) {
      console.log(m)
    },
    logout: function () {
      api.unauth()
      this.$router.go('/')
      this.loggedIn = false
      console.log('logged out')
    },
    update: function () {
      this.loggedIn = store.loggedIn
    }
  },
  created () {
    store.on('auth-changed', this.update)
  },
  destroyed () {
    store.removeListener('auth-changed', this.update)
  }
}
</script>

<style lang="stylus">
@import '../assets/palette'
body
  background palette('Teal', '200')

.ui.top.attached.menu
  background palette('Teal', '400')
  border 1px solid palette('Teal', '700')
  .menu.right
    background palette('Teal', '400')
    border-width 0 1px 0 0
    box-shadow none
    border-radius 0

  a
    color white

.fade-transition
  transition all .5s ease

.fade-enter, .fade-leave
  opacity 0



</style>
