<template>
  <div :id="localId" class="loop-list--components loop">
    <slot />
    <div v-if="pageTotal === 0 && finish" class="empty-list">
      <div class="text-c">
        <i class="iconfont icon-duanwang text-gray" />
      </div>
    </div>
    <div v-if="showState" class="load-state">
      <div v-if="pageTotal === 0" class="finish finish-page text-gray">
        <span>暂无文章</span>
      </div>
      <div v-else-if="finish" class="finish text-gray">
        <span>-- END --</span>
      </div>
      <div v-else class="more">
        <i class="el-icon-loading" />
        <span>加载更多</span>
      </div>
    </div>
  </div>
</template>
<script>
import { setTimeout } from "timers";
export default {
  name: "LoopList",
  props: {
    id: {
      type: String,
      default: "localId"
    },
    hasShow: {
      type: Boolean,
      default: true
    },
    pageInfo: {
      type: Object,
      required: true
    },
    showState: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    nowTop: {
      type: Number,
      default: 0
    },
    pageTotal: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      pIndex: this.pageInfo.PageIndex,
      pSize: this.pageInfo.PageSize,
      localId: "loopList" + this.id,
      windowHeight: 0,
      loadState: true, // 是否显示底部加载状态，默认true
      domHeight: 0, // 内容可视区的高度
      container: null // 绑定能被监听滚动的元素
    };
  },

  computed: {
    finish() {
      return this.pageTotal <= this.pageInfo.PageIndex * this.pageInfo.PageSize;
    }
  },

  mounted() {
    this.init();
    this.bindLoop();
  },
  destroyed() {
    document.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    init() {
      this.windowHeight = window.innerHeight;
    },
    bindLoop() {
      document.addEventListener("scroll", this.onScroll);
    },
    getTop() {
      return document.documentElement.scrollTop || document.body.scrollTop;
    },
    onScroll() {
      let el = document.getElementById("app");
      let position = el.getBoundingClientRect();
      let elHeight = position.height;
      let scrollTop = this.getTop();

      this.hasShow && this.$emit("update:nowTop", scrollTop);
      let pian = 0;
      // console.log(this.localloading)

      if (
        scrollTop &&
        elHeight - this.windowHeight - scrollTop <= pian &&
        !this.loading &&
        !this.finish &&
        this.hasShow
      ) {
        // this.localloading = true;
        this.$emit("update:loading", true);
        setTimeout(() => {
          this.loopMore();
        }, 50);
      }
    },
    loopMore() {
      ++this.pageInfo.PageIndex;
      this.$emit("update:pageInfo", this.pageInfo);
      this.$emit("loopMore");
    }
  }
};
</script>
<style lang='scss' scoped>
.zhan {
  width: 100%;
  min-height: 300px;
}
.loop {
  display: block;
}
.empty-list {
  .text-c {
    padding-top: 50px;
  }
  .icon-duanwang {
    font-size: 150px;
  }
}
.load-state {
  text-align: center;
  font-size: 13px;
  .more {
    line-height: 40px;
    border: 1px solid $border-color;
    width: 200px;
    margin: 10px auto;
    border-radius: 20px;
    color: $main;
  }
  .finish {
    padding: 10px;
  }
  .finish-page {
    padding-bottom: 30px;
  }
}
</style>