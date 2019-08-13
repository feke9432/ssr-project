<template>
  <div v-loading="loading" class="side-box hot-ariticle-list">
    <div class="title">
      <span class="title-msg">猜你喜欢</span>
    </div>
    <div class="list ">
      <simpleArticleBlock
        v-for="item in list"
        :key="item.Id"
        :item="item"
        show-author
      />
    </div>
  </div>
</template>
<script>
import { Cms } from "@/api";
import simpleArticleBlock from "./simpleArticleBlock";
export default {
  name: "MayYouLike",
  components: {
    simpleArticleBlock
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
      this.loading = true
      this.$api(Cms.Search, { OrderBy: 2, PageSize: 5 }).then(res => {
        this.list = res.List;
        this.loading = false
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>