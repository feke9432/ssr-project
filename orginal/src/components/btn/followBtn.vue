<template>
  <el-button
    :type="(value & 8) === 8?'primary':'default'"
    class="btn"
    :size="size"
    @click="handleClick"
  >
    {{ btnMsg }}
  </el-button>
</template>
<script>
import { Cms } from "@/api";

export default {
  props: {
    size: {
      type: String,
      default: 'mini'
    },
    value: {
      type: Number,
      default: 0
    },
    followedUserId: {
      type: [Number, String],
      default: 0
    }
  },
  
  data() {
    return {
      isFollow: this.value
    };
  },
  computed: {
    btnMsg() {
      let str = "+关注";
      let FollowStatus = this.value;
      if ((FollowStatus & 8) === 8) {
        str = "+关注";
      } else if ((FollowStatus & 1) === 1) {
        str = "已关注";
      } else if ((FollowStatus & 2) === 2) {
        str = "互相关注";
      }
      return str;
    }
  },
  methods: {
    handleClick() {
      // let userId = this.$mdUtils.getUserInfo("Id")
      // if (!userId) {
      //   return this.$tips.error('请先登录')
      // }
      this.$api(Cms.FollowToggleFollow, {
        UserId: this.$mdUtils.getUserInfo("Id"),
        FollowedUserId: this.followedUserId
      }).then(() => {
        this.$emit("onSuccess");
        this.$emit("input");
      });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>