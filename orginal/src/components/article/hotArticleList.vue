<template>
  <div v-loading="loading" class="side-box hot-ariticle-list">
    <div class="title">
      <span class="title-msg">热门文章</span>
    </div>
    <div class="list ">
      <articleEmptyBlock v-if="list.length === 0" />
      <simpleArticleBlock v-for="item in list" :key="item.Id" :item="item" />
    </div>
  </div>
</template>
<script>
import { Cms } from "@/api";
import simpleArticleBlock from './simpleArticleBlock'
import articleEmptyBlock from './articleEmptyBlock'
export default {
  name: 'HotArticleList',
  components: {
    simpleArticleBlock,
    articleEmptyBlock
  },
  props: {
    userId: {
      type: Number,
      default: 0
    }
  },
  
  data() {
    return {
      activeName: "first",
      list: [],
      loading: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true
      this.$api(Cms.Search, { OrderBy: 1, UserId: this.userId, PageSize: 5 }).then(res => {
        this.list = res.List;
        this.loading = false
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>