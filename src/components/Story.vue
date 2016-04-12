<template lang="jade">
.ui.container.segment
  .ui.feed
    event(:body="post.body",
          :num-likes="post.likes",
          :num-down="post.dislikes",
          :num-comments="post.numcomments",
          :time="post.time",
          :pid="post.id",
          :author="post.author")
  .ui.comments
    h3.ui.dividing.header(v-if="post.comments") Comments
    .ui.form(v-if="loggedIn")
      .field
        textarea(v-model="newcomment", placeholder="Shout at strangers", rows="3")
      .ui.button(tabindex="0", @click="submitComment").blue
        | Submit
    comments(v-for="comment in post.comments",
             :body="comment.body",
             :time="comment.time",
             :author="comment.author"
        )


</template>

<script>
import Comments from './Comments.vue'
import Event from './Event.vue'
import store from '../store'

export default {
  data () {
    return {
      post: '',
      newcomment: '',
      loggedIn: store.loggedIn
    }
  },
  components: {
    'comments': Comments,
    'event': Event
  },
  methods: {
    submitComment: function () {
      if (this.newcomment.length > 0) {
        store.comment(this.$route.params['id'], this.newcomment)
        this.newcomment = ''
      }
    },
    update: function () {
      this.post = store.fetchPost(this.$route.params['id'])
      this.loggedIn = store.loggedIn
    }
  },
  attached: function () {
    this.post = store.fetchPost(this.$route.params['id'])
  },
  created () {
    store.on('newposts-updated', this.update)
    store.on('auth-changed', this.update)
  },
  destroyed () {
    store.removeListener('newposts-updated', this.update)
    store.removeListener('auth-changed', this.update)
  }
}
</script>

<style lang="stylus">

</style>
