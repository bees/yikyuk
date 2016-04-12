<template lang="jade">
.comment
  .content
    .metadata
      span.date {{ time | moment "from" }}
    .text
      | {{ body }}
//    .actions
      a.reply Reply


</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['body', 'time'],
  methods: {
  },
  ready: function () {
  }
}
</script>

<style lang="stylus">
@import '../assets/palette'

.ui.comments .comment .content .metadata
  margin-left 0 !important

</style>
