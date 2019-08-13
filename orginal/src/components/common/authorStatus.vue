<template>
  <span class="author-icon">
    <svg
      v-if="userType === 1"
      class="svg-icon"
      :style="style"
      aria-hidden="true"
    >
      <use xlink:href="#icon-qiye1" />
    </svg>
    <svg
      v-if="userType === 14"
      class="svg-icon"
      :style="style"
      aria-hidden="true"
    >
      <use xlink:href="#icon-zhuanjia" />
    </svg>
    <svg
      v-if="userType === 22"
      class="svg-icon"
      :style="style"
      aria-hidden="true"
    >
      <use xlink:href="#icon-hangjia" />
    </svg>
  </span>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    userType: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style() {
      let flag = 44 / 31;
      return `width:${this.size * flag}px;height:${this.size}px;`;
    }
  }
};
</script>
<style lang='scss' scoped>
.author-icon {
  position: relative;
  .svg-icon {
    position: relative;
    top: 5px;
  }
}
</style>