<template>
  <div class="footer-box side-box">
    <div class="msg">
      <span> Copyright © 2019 Talk工控</span>
    </div>
    <div class="msg">
      <div class="clearfix">
        <a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31010602003791"
          style="display:inline-block;text-decoration:none;float:left;width: 220px;white-space: nowrap;"
        >
          <img class="footer-beian-img beian" src="/assets/img/beian.png" style="float:left;">
          <p
            style="height:20px;margin: 0px 0px 0px 5px; color:#fff;"
          >
            沪公网安备 31010602003791号
          </p>
          
        </a>
        <span style="float:left;" class="fen">|</span>
        <a style="float:left;" href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&serial=9031000020170510133958000001769199-SAIC_SHOW_310000-4028e4cb6579723f0166538cf8830cec032&signData=MEUCIQC4LIDrkTBP0hGJWp0oJlNS1H/IGpSGihsk9yXFyzexRAIgSHkAX2DLYsQhBlmOOEx6tH3ufREyoetNCcNiUB96sco=">
          <img class="footer-beian-img" src="/assets/img/liangzhao.jpg" alt="">
        </a>
        <p style="float:left;height:20px; color:#fff; margin: 0px 0px 5px;">沪ICP备15013370号-3</p>
      </div>
    </div>
    <div class="msg">
      <span @click="goFloorPage('aboutUs')">关于我们</span>
      <span class="fen">|</span>
      <span @click="goFloorPage('treaty')">用户协议</span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'PublicFooter',
  methods: {
    goFloorPage(type) {
      let routeUrl = this.$router.resolve({ name: 'floorPage', params: { type } })
      window.open(routeUrl.href, '_blank')
    }
  }
};
</script>
<style lang='scss' scoped>
.footer-box {
  padding: 20px;
  background: #2b323f;
  .msg {
    line-height: 2;
    color: #fff;
    font-size: 14px;
    .fen {
      padding: 0 10px;
    }

    span {
      cursor: pointer;
    }
  }
  .beian {
    position: relative;
    top: 4px;
  }
  .footer-beian-img {
    height: 18px;
    vertical-align: middle;
  }
}
</style>