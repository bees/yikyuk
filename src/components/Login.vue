<template lang="jade">
.ui.container.segment
  .ui.two.column.middle.aligned.very.relaxed.stackable.grid
    .column
      form.ui.form(v-on:submit.prevent="login")
        .field
          label Email
          .ui.left.icon.input
            input(v-model="email", type='text', placeholder='Email')
            i.mail.icon
        .field
          label Password
          .ui.left.icon.input
            input(v-model="password" type='password')
            i.lock.icon
        button.ui.blue.submit.button Login
    .ui.vertical.divider
      | Or
    .center.aligned.column
      a.ui.big.green.labeled.icon.button(v-link="{name: 'register'}")
        i.signup.icon
        | Sign Up



</template>

<script>
import store from '../store'
import Firebase from 'firebase'
const api = new Firebase('https://torrid-inferno-4476.firebaseio.com/')

export default {
  data () {
    return {
      email: '',
      password: '',
      showreg: false
    }
  },
  methods: {
    login: function () {
      var vm = this
      console.log('login function called')
      api.authWithPassword({
        email: this.email,
        password: this.password
      }, function (oops, authData) {
        if (oops) {
          console.log('Login Failed!', oops)
        } else {
          console.log('Authenticated successfully with payload:', authData)
          store.loggedIn = true
          vm.$router.go('/')
        }
      })
    }
  },
  activate: function () {
    console.log(this.$route.params)
    if (this.$route.params['success'] === 'success') {
      this.showreg = true
      console.log('wtf')
    }
  }
}
</script>

