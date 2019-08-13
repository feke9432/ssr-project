<template>
  <div class="change-card-btn--components">
    <el-button v-if="isChanged" class="change-card-btn-main" :size="size">已交换名片</el-button>
    <el-button 
      v-else 
      class="change-card-btn-main" 
      :size="size" 
      @click="changeCard"
    >
      交换名片
    </el-button>
    <el-dialog
      :visible.sync="showChangCard"
      width="400px"
      title="您已关注TA"
    >
      <div class="change-card-msg">为了更好的提供服务，是否与TA交换名片</div>
      <div class="change-card-msg">
        <el-checkbox v-model="notShowChangeCardDialog">不再提示</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="big" @click="showChangCard = false">取 消</el-button>
        <el-button size="big" type="primary" @click="handleCloseCard">交换</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :visible.sync="showNoticeComplete"
      title="提示"
      width="300px"
      :before-close="handleCloseComplete"
    >
      <div class="change-card-msg change-card-info">需完善名片的必填项后才可与TA交换名片</div>
      <div class="change-card-btn">
        <el-button type="primary" @click="goPage">立即完善名片信息</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { Cms } from "@/api";
export default {
  props: {
    size: {
      type: String,
      default: "mini"
    },
    followedUserId: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      isFollow: this.value !== 8,
      showChangCard: false,
      notShowChangeCardDialog: false,
      showNoticeComplete: false,
      ShowChangeCardDialogKey: "notShowChangeCardDialog",
      userId: this.$mdUtils.getUserInfo("Id"),
    };
  },
  computed: {
    isChanged() {
      return (this.value & 4) === 4
    }
  },
  methods: {
    changeCard() {
      this.notShowChangeCardDialog = localStorage.getItem(
        this.ShowChangeCardDialogKey
      );
      if (this.value === 8 || this.value == 0) {
        this.$api(Cms.FollowToggleFollow, {
          UserId: this.userId,
          FollowedUserId: this.followedUserId
        }).then(() => {
          this.$emit("changeSuccess", true);
        }).catch(() => {
          this.showChangCard = false;
        })
      }

      if (!this.notShowChangeCardDialog) {
        this.showChangCard = true;
      } else {
        this.changeCardApi();
      }
    },
    handleCloseCard() {
      this.changeCardApi();
      if (this.notShowChangeCardDialog) {
        localStorage.setItem(this.ShowChangeCardDialogKey, true);
      }
    },
    changeCardApi() {
      this.$api(
        Cms.FollowChangeCard,
        {
          UserId: this.userId,
          FollowedUserId: this.followedUserId
        },
        false,
        false
      )
        .then(() => {
          this.$message.success("交换成功");
          this.showChangCard = false;
          this.$emit("changeSuccess", true);
        })
        .catch(err => {
          if (err.ErrorCode == "ChangeCard_Imperfect") {
            this.showNoticeComplete = true;
            this.showChangCard = false;
          }
        });
    },
    goPage() {
      let userId = this.$mdUtils.getUserInfo('Id')
      let token = this.$mdUtils.getToken()
      if (token && userId) {
        let url = process.env.VUE_APP_AUTHOR_URL
        window.open(`${url}/#/home?outloginid=${userId}&token=${token}`)
      }
    },
    handleCloseComplete() {
      this.showNoticeComplete = false;
    }
  }
};
</script>
<style lang="scss">
.change-card-btn--components {
  .change-card-btn-main {
    width: 100%
  }
  .change-card-btn .el-button {
    width: 100%;
  }
}
</style>

<style lang='scss' scoped>
.change-card-btn--components {
  display: inline-block;
  vertical-align: middle;
}
.change-card-info {
  margin-bottom: 20px;
}
.change-card-msg {
  text-align: left;
  padding: 10px 26px;
  font-size: $font-size-normal;
  white-space: pre-wrap;
}
</style>