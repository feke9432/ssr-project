<template>
  <div>
    <h1 class="titile">{{detail.Title}}</h1>
    <div class="hot-tags">
      <span class="tag" v-for="(item, index) in hotTags" :key="index">{{item}}</span>
    </div>
    <div class="content" v-if="detail.Free || detail.Type == 2" v-html="detail.Content" />
    <div class="content" v-else v-html="detail.TrialContent" />
  </div>
</template>
<script>
  import { Cms } from '@/api'
  export default {
    name: 'detail',
    data() {
      return {
        hotTags: [],
        defaultDetail: {
          Free: true,
          Type: 1,
          Content: '抱歉页面找不到了'
        }
      }
    },
    computed: {
      detail() {
        let _detail = this.$store.state.detail
        if (_detail.Content || _detail.TrialContent) {
          return this.$store.state.detail
        } else {
          return this.defaultDetail
        }
      }
    },
    mounted() {
      this.init()
    },
    asyncData ({ store, route: { params: { id }}}) {
      return store.dispatch('GET_DETAIL', { id })
    },
    methods: {
      init() {
        this.$api(Cms.QueryHotTerms, {}).then((res) => {
          if (res.Body) {
            this.hotTags = res.Body.Terms
          }
        })
      }
    }
  }
</script>
<style lang='scss' scoped>
</style>