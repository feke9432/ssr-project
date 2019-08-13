<template>
  <span>
    <span v-if="!isAdmin && localInfo.Top" class="is-top-icon">置顶</span>
    <span v-if="!localInfo.Free" class="is-free-icon">付费阅读</span>
    <span v-if="(localInfo.RecommendStatus & 2) > 0" class="is-recommend-icon">已推荐</span>
    <span
      v-if="(localInfo.RecommendStatus & 1024) > 0"
      class="not-recommend-icon"
    >不推荐</span>
    <span v-if="localInfo.IsProduct" class="is-feature-icon">特色商品</span>
  </span>
</template>

<script>
import RouterList from "@/route/RouterList";
export default {
  name: "ArticleTags",
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  
  data() {
    return {
      isAdmin: false,
      localInfo: {
        Top: false,
        Free: true,
        RecommendStatus: 0,
        IsProduct: false
      }
    };
  },
  watch: {
    info: function(val) {
      this.setLocalInfo(val);
    }
  },
  created() {
    this.setLocalInfo(this.info);
    this.isAdmin = RouterList.getNowProject() === "management";
  },
  methods: {
    setLocalInfo(val) {
      this.localInfo = JSON.parse(JSON.stringify(val));
    }
  }
};
</script>

