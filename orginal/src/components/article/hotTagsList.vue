<template>
  <div v-loading="loading" class="side-box">
    <div class="title">
      <span class="title-msg">热门搜索</span>
    </div>
    <div class="list md-tag-group">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="md-tag ellipsis"
        @click="go(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { Cms } from "@/api";
export default {
  name: "TopRankList",
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      activeName: "first",
      list: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$api(Cms.QueryHotTerms, {}).then(res => {
        this.list = res.Terms;
        this.loading = false;
      });
    },  
    go(tag) {
      let routeUrl = this.$router.resolve({name: 'search', params: {terms: tag}})
      window.open(routeUrl.href, '_blank')
    }
  }
};
</script>
<style lang='scss' scoped>
</style>