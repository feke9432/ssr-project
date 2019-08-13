<template>
  <div class="user-view">
    <div class="list">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="item-title">
          <router-link :to="{name: 'detail', params: {id: item.Id}}" target="_blank">{{item.Title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  computed: {
    list() {
      return this.$store.state.articles
    }
  },
  asyncData ({ store, route: { params: { id }}}) {
    return store.dispatch('SEARCH', { id })
  },
}
</script>

<style lang="stylus">
.user-view
  background-color #fff
  box-sizing border-box
  padding 2em 3em
  h1
    margin 0
    font-size 1.5em
  .meta
    list-style-type none
    padding 0
  .label
    display inline-block
    min-width 4em
  .about
    margin 1em 0
  .links a
    text-decoration underline
</style>
