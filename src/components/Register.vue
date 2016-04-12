<template lang="jade">
.ui.container.segment
    .container(v-show="error").oopsie.segment
      h3 {{ errormsg }}
    form(v-on:submit.prevent="register").ui.form
      .field
        label Email
        .ui.left.icon.input
          input(type='text', v-model="email", placeholder='Email')
          i.mail.icon
      .field
        label Password
        .ui.left.icon.input
          input(type='password', v-model="password")
          i.lock.icon
      .field
        .ui.checkbox
          input(v-model="dontbeajackass", type='checkbox', tabindex='0')
          label I understand that this is not an anonymous forum and promise not to be a meanie
      button.ui.button(type='submit') Register

</template>

<script>
import Firebase from 'firebase'
const api = new Firebase('https://torrid-inferno-4476.firebaseio.com/')

export default {
  data () {
    return {
      email: '',
      password: '',
      error: false,
      errormsg: '',
      dontbeajackass: false
    }
  },
  methods: {
    register: function () {
      if (this.dontbeajackass) {
        var vm = this
        api.createUser({
          email: this.email,
          password: this.password
        }, function (oops, userData) {
          if (oops) {
            console.log('ow')
            vm.error = true
            vm.errormsg = oops
          } else {
            console.log('Authenticated successfully with payload:', userData)
            vm.$router.go('/login')
          }
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/palette'

.oopsie
  background palette('Red')
  color white
  padding 5px
  border-radius 5px
  margin-bottom 1rem

</style>
