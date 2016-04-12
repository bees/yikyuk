<template lang="jade">
.ui.container.segment
  .ui.form(v-if="loggedIn")
    .field
      textarea(v-model="newpost", placeholder="Shout into the void", rows="4")
    .ui.button(tabindex="0", @click="submitPost").submit-button
      | Submit
  .greetings(v-else)
    h3 Hiya!
    p Comments below should appear and update in real time. If you want to test the application,
      a(v-link="'/register'") register here,
      | and poke around a bit.

    p Unfortunately this application will break occasionally, usually refreshing the page will fix it.
    .ui.divider

  div(v-if="posts.length")
    .ui.divider(v-if="loggedIn")
    .ui.feed
      event(v-for="post in posts",
            :body="post.body",
            :num-likes="post.likes",
            :num-down="post.dislikes",
            :time="post.time",
            :num-comments="post.numcomments",
            :pid="post.id")

</template>

<script>
import store from '../store'
import Event from './Event.vue'

export default {
  components: {
    'event': Event
  },
  data () {
    return {
      newpost: '',
      posts: [],
      loggedIn: store.loggedIn
    }
  },
  props: [],
  methods: {
    update: function () {
      // TODO: update this to support pagination
      this.posts = store.fetchPosts()
      this.loggedIn = store.loggedIn
    },
    viewEvent: function () {
      console.log('huh')
    },
    submitPost: function () {
      if (this.newpost.length > 0) {
        store.createPost(this.newpost)
        this.newpost = ''
      }
    }
  },
  created () {
    store.on('newposts-updated', this.update)
    store.on('auth-changed', this.update)
  },
  destroyed () {
    store.removeListener('newposts-updated', this.update)
    store.removeListener('auth-changed', this.update)
  },
  ready: function () {
    this.posts = store.fetchPosts()
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/palette'
.segment a.label.ui
  margin 0 5px

.classnum
  background palette('Red')
  padding 5px
  border-radius 5px

.submit-button
  background palette('Teal')
  color white
  &:hover, &:active
    background palette('Teal', '700')
    color white
  &:focus
    background palette('Teal', '700')
    color white

.greetings
  a
    margin 0 .5rem
</style>
