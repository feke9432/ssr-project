<template>
  <div class="wrap videoBlock" @click="jump(info)">
    <div class="img">
      <el-image lazy :src="info.CoverImage || emptyImg">
        <div slot="error" class="image-slot">
          <img :src=" emptyImg">
        </div>
      </el-image>   
      <i v-show="!isAd" class="el-icon-caret-right icon"></i>   
    </div> 
    <div class="content">
      <div class="ellipsis-more-2">
        <p v-html="info.Title"></p>
        <span class="ellipsis-more-2-after"> ... </span>
      </div>
      <div class="text-gray clearfix">
        <span class="float-l ellipsis">{{ info.Author }}</span>
        <span v-if="info.PublishDate" class="float-r ellipsis">{{ info.PublishDate | time-parse }}</span>
        <span v-if="info.DisplayTime" class="float-r ellipsis">{{ info.DisplayTime | time-parse }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoBlock',
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
  width: 205px;
  margin: 20px 0;
  cursor: pointer;
}
.img {
  position: relative;
  width: 205px;
  height: 130px;
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
  font-size: 14px;
  & > div:nth-of-type(1) {
    margin: 15px 0;
  }
  .text-gray {
    span {
      display: inline-block;
      max-width: 50%;
    }
  }
}
</style>



<style lang="scss">
.videoBlock {
  .el-image {
    width: 205px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
