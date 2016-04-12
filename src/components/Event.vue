<template lang="jade">
.event
  .content
    .summary
      a(v-link="{name: 'comments', params: {id: pid}}").title {{ body }}
      .date
        | {{ time | moment "from" }}
    .meta
      a(@click="like").like
        i(v-bind:class="[liked ? active : '']").icon.like
        | {{ numLikes }}
      a(@click="dislike").sad
        i.icon.thumbs.down
        | {{ numDown }}
      a(v-link="{name: 'comments', params: {id: pid}}").comments
        i.icon.comment
        | {{ numComments }}

</template>

<script>
import store from '../store'

export default {
  data () {
    return {
//    liked: store.state.voted[this.pid] === 1,
//    disliked: store.state.voted[this.pid] === -1
    }
  },
  props: [
    'body',
    'numLikes',
    'numDown',
    'numComments',
    'time',
    'author',
    'pid'
  ],
  methods: {
    like: function () {
      store.like(this.pid, true)
    },
    dislike: function () {
      store.dislike(this.pid, true)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../assets/palette'

a.sad
  i.down.thumbs.icon
    &.active, &:hover
      color palette('Green')

.event
  a.delete
    visibility hidden
  &:hover .content .meta a.delete i
    visibility visible
    color palette('Red', '200')
    &:hover
      color palette('Red')



.summary
  a.title
    color black
    &:hover
      text-decoration underline
</style>
