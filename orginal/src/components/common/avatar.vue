<template>
  <div class="wrap-avatar">
    <img v-if="src" :src="src" fit="cover">
    <i v-else class="base-avatar iconfont icon-wode2" :style="`font-size:${size}px`" />
  </div>
</template>

<script>
export default {
  name: "Avatar",
  props: {
    size: {
      type: Number,
      default: 24
    },
    src: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return `width:${this.width}px;height:${this.height}px;`;
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap-avatar {
  display: inline-block;
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background: rgba(231, 231, 231, 1);
  border: 2px solid rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 50%;
  box-sizing: border-box;
  overflow: hidden;
  .base-avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
  img {
    vertical-align: top;
    width: 100%;
    height: 100%;
  }
}
</style>

<style lang="scss">
.wrap-avatar {
  overflow: hidden;
  .van-image {
    border-radius: 50%;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
}
</style>

