<template>
  <div>
    <el-dialog
      :visible.sync="isShowDialog"
      :before-close="handleClose"
      width="400px"
      :modal-append-to-body="false"
    >
      <div class="title">
        <span>Talk工控</span>
      </div>
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="验证码登录" name="phoneForm">
          <el-form
            ref="phoneForm"
            class="mart-15"
            :model="phoneForm"
            :rules="phoneFormRules"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="手机号码" prop="MobilePhone">
              <el-input v-model.number="phoneForm.MobilePhone" />
            </el-form-item>
            <el-form-item label="验证码" prop="Captcha">
              <div class="flex-row">
                <el-input v-model="phoneForm.Captcha" class="flex-row-eq" />
                <el-button
                  :disabled="captcha_disabled"
                  type="primary"
                  size="mini"
                  @click="sendCaptcha"
                >
                  {{ captcha_text }}
                </el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="密码登录" name="passwordForm">
          <el-form
            ref="passwordForm"
            class="mart-15"
            :model="passwordForm"
            :rules="passwordFormRules"
            label-width="100px"
            label-position="left"
          >
            <el-form-item label="手机号码" prop="MobilePhone">
              <el-input v-model.number="passwordForm.MobilePhone" />
            </el-form-item>
            <el-form-item label="登录密码" prop="Password">
              <el-input v-model="passwordForm.Password" type="password" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="protocol-box">
        <el-checkbox v-model="checked">
          <span>新用户登录即自动注册，并表示已同意</span>
          <router-link
            target="_blank"
            class="text-blue"
            :to="{ name: 'floorPage', params: { type: 'treaty' } }"
          >
            《用户协议》
          </router-link>
        </el-checkbox>
      </div>
      <!-- <div>
      <a :href="wxUrl" target="_black">
        <svg class="svg-icon weixin-icon" aria-hidden="true">
          <use xlink:href="#icon-weixin1" />
        </svg>
      </a>
    </div> -->
      <el-button class="large-btn" type="primary" @click="submit">
        登录
      </el-button>
    </el-dialog>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import { Notice, Account, Cms } from "@/api";
import { validateNum, checkMobilePhone } from "@/utils/vaildate";
import ThirdPlatform from "@/services/ThirdPlatform";
import md5 from "js-md5";
export default {
  name: "Logon",
  data() {
    return {
      show: this.value,
      activeName: "phoneForm",
      checked: false,
      countDown: 60,
      captcha_status: 1,
      phoneForm: {
        MobilePhone: "",
        Captcha: ""
      },
      passwordForm: {
        MobilePhone: "",
        Password: ""
      },
      phoneFormRules: {
        MobilePhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobilePhone, trigger: "blur" }
        ],
        Captcha: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: validateNum, trigger: "blur" }
        ]
      },
      passwordFormRules: {
        MobilePhone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkMobilePhone, trigger: "blur" }
        ],
        Password: [
          { required: true, message: "请输入登录密码", trigger: "blur" }
        ]
      },
      wxUrl: ThirdPlatform.getThirdPlatformUrl(1, 2)
    };
  },
  computed: {
    captcha_disabled() {
      return this.captcha_status !== 1;
    },
    captcha_text() {
      let result = "";
      switch (this.captcha_status) {
        case 1:
          result = "获取验证码";
          break;
        case 2:
          result = "正在发送";
          break;
        case 3:
          result = `重新发送(${this.countDown}S)`;
          break;
      }
      return result;
    },
    ...mapState({
      isShowDialog: state => state.login.isShowLogin
    })
  },
  methods: {
    handleClose() {
      this.showLoginDialogn(false);
    },

    sendCaptcha() {
      let reg = /^[1][0-9]{10}$/;
      if (!reg.test(this.phoneForm.MobilePhone)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      this.captcha_status = 2;
      this.$api(Notice.SendCaptcha, { Phone: this.phoneForm.MobilePhone })
        .then(() => {
          this.startCountDown();
        })
        .catch(() => {
          this.captcha_status = 1;
        });
    },
    startCountDown() {
      let timer;
      this.captcha_status = 3;
      setInterval(() => {
        if (this.countDown === 1) {
          clearTimeout(timer);
          this.captcha_status = 1;
          this.countDown = 60; // 复原
          return;
        }
        this.countDown--;
      }, 1000);
    },
    async submit() {
      try {
        const result = await this.$refs[this.activeName].validate();

        if (!result) throw new Error(this.errors.items[0].msg);
        if (!this.checked) throw new Error("请阅读并勾选用户协议");

        let req = await this.accountLogOn();
        this.$mdUtils.setToken(req.Token);

        let cmsReq = await this.cmsLogOn(req.Data.Id);

        this.$mdUtils.setUserInfo(cmsReq);
        this.handleClose();
        this.setLogin(true);
        this.$emit("loginSuccess");
      } catch (error) {
        if (error) {
          if (error.message) {
            error = error.message;
          }
          this.$message({
            type: "error",
            message: error
          });
        }
      }
    },
    accountLogOn() {
      let url, reqMsg;
      if (this.activeName === "phoneForm") {
        url = Account.LogOnOrRegisterForCMS;
        reqMsg = this.phoneForm;
      } else {
        url = Account.LogOnOrRegisterForCMSByPhone;
        reqMsg = JSON.parse(JSON.stringify(this.passwordForm));
        reqMsg.Password = md5(reqMsg.Password);
      }
      return this.$api(url, reqMsg);
    },
    cmsLogOn(id) {
      return this.$api(Cms.Logon, { Id: id });
    },
    ...mapMutations("login", ["showLoginDialogn", "setLogin"])
  }
};
</script>
<style lang='scss' scoped>
.title {
  margin-bottom: 20px;
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  color: $text-main;
}
.large-btn {
  width: 100%;
}
.weixin-icon {
  width: 60px;
  height: 60px;
}
.protocol-box {
  margin: 12px 0 34px;
  text-align: center;
}
</style>