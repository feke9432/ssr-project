<template>
  <div class="item clearfix">
    <router-link target="_blank" :to="{name: 'detail', params: {id: item.Id}}">
      <div class="left">
        <div class="item-title mult-ellipsis">
          <span>{{ item.Title }}</span>
        </div>
        <div class="footer">
          <span v-if="showAuthor" class="text-gray ellipsis author">{{ item.Author }}</span>
          
          <span v-else class="text-gray"><i class="iconfont icon-yuedu text-gray" />{{ item.Report.View }}</span>
        </div>
      </div>
      <div class="right">
        <img
          class="article-img"
          :src="item.CoverImage || emptyImg"
          alt=""
          srcset=""
        >
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  name: "SimpleArticleBlock",
  props: {
    showAuthor: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {
          Id: '',
          Title: "",
          CoverImage: "",
          Report: {
            View: 0
          }
        };
      }
    }
  },
  data() {
    return {
      emptyImg: process.env.VUE_APP_ARTICLE_IMG
    };
  }
};
</script>
<style lang='scss' scoped>
.clearfix {
  .left,.right {
    float: left;
  }
}
.author {
  max-width: 14em;
  display: inline-block;
}
</style>