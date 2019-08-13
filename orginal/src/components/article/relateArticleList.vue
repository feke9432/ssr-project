<template>
  <div v-loading="loading" class="side-box hot-ariticle-list">
    <div class="title">
      <span class="title-msg">相关推荐</span>
    </div>
    <div class="list ">
      <articleEmptyBlock v-if="list.length === 0" />
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
import articleEmptyBlock from './articleEmptyBlock'
export default {
  components: {
    simpleArticleBlock,
    articleEmptyBlock
  },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          Id: 0,
          Tags: []
        };
      }
    }
  },

  data() {
    return {
      activeName: "first",
      list: [],
      loading: false,
    };
  },

  watch: {
    info() {
      this.init()
    }
  },
  created() {
    this.info.Id && this.init();
  },
  methods: {
    init() {
      this.loading = true;
      this.$api(Cms.Search, {
        ExcludeIds: [this.info.Id],
        Tags: this.info.Tags,
        PageSize: 3
      }, false, false).then(res => {
        this.list = res.List;
        this.loading = false;
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>