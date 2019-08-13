<template>
  <div v-loading="loading" class="side-box">
    <div class="title">
      <span class="title-msg">热门排行</span>
    </div>
    <div class="list ">
      <div
        v-for="(item, index) in list"
        :key="item.Id"
        class="hot-title ellipsis"
      >
        <router-link
          target="_blank"
          :to="{ name: 'detail', params: { id: item.Id } }"
        >
          <span class="hot-count" :class="{ 'text-red': index < 3 }">{{
            index + 1
          }}</span>
          <span>{{ item.Title }}</span>
        </router-link>
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
      this.$api(Cms.SearchTopRank, {}).then(res => {
        this.list = res.List;
        this.loading = false;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>