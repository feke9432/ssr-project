<template>
  <div class="wrap articleBlock clearfix" @click="jump(info)">
    <div class="img">
      <el-image lazy :src="info.CoverImage || emptyImg">
        <div slot="error" class="image-slot">
          <img :src=" emptyImg">
        </div>
      </el-image>   
      <i v-show="info.Type===2" class="el-icon-caret-right icon"></i>   
    </div> 
    <div class="content">
      <div class="ellipsis-more-2">
        <p v-html="info.Title"></p>
        <span class="ellipsis-more-2-after"> ... </span>
      </div>
      <div class="text-gray">
        <span v-if="isAuthorPage && info.Top" class="is-top-icon float-l">置顶</span>
        <span class="float-l">{{ info.Author }}</span>
        <span v-if="info.PublishDate" class="float-r">{{ info.PublishDate | time-parse }}</span>
        <span v-if="info.DisplayTime" class="float-r">{{ info.DisplayTime | time-parse }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ArticleBlock',
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {
        return {
          Title: '',
          CoverImage: '',
          Top: false,
          Author: '',
          DisplayTime: '',
          Link: ''
        }
      }
    },
    isAd: {
      type: Boolean,
      default: false
    },
    isAuthorPage: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      emptyImg: process.env.VUE_APP_ARTICLE_IMG
    }
  },
  methods: {
    jump(info) {
      if (this.isAd) {
        let that = this
        window.open(that.info.Link)
      } else {
        let routeUrl = this.$router.resolve({ name: 'detail', params: { id: info.Id } })
        window.open(routeUrl.href, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  padding: 20px 0;
  border-bottom: 1px solid $border-color;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
.img {
  position: relative;
  float: left;
  margin-right: 20px;
  .icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 16px;
    color: #fff;
    background: rgba(43, 50, 63, 0.8);
    border-radius: 50%;
    padding: 5px;
  }
}

.content {
  position: relative;
  left: 0;
  right: 0;
  height: 100px;
  overflow: hidden;
  & > div:nth-of-type(1) {
    font-size: 20px;
  }
  & > div:nth-of-type(2) {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 14px;
  }
}
$md--top-color: #EBA33D;
.is-top-icon {
  margin-right: 6px;
  padding: 0 4px;
  line-height: 16px;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  font-size: 12px;
  color: $md--top-color;
  border-color: $md--top-color;
}
</style>



<style lang="scss">
.articleBlock {
  .el-image {
    width: 160px;
    height: 100px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
