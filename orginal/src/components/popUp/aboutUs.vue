<template>
  <div class="wrap">
    <div class="header">
      <h4><span class="bottom-line">关于我们</span></h4>
    </div>
    <div class="content">
      <p>Talk工控是买道传感网旗下资讯平台，是一个有意思的传感器综合资讯网站。内容包含各类传感器等仪器仪表测评，仪器仪表原理、技术、行业应用、器材调试安装等专业视频、行业解决方案、案例收集分享，以及国内外仪器仪表品牌新闻、政策市场动向，有意思的传感器黑科技等内容。</p>
      <p>买道传感网正式上线于2016年7月1日，买道传感科技（上海）有限公司深耕工业领域20余年，1996年就有了第一家客户，团队从零散客户的痛点出发，结合商品、交易和供应链多个方面，秉承“为用户争取最大价值”的理念，致力于满足各类用户涉及工业传感器的全方位需求。 目前买道传感网已包含传感器交易、传感器行业资讯、传感器技术服务等多类相关专业服务，已覆盖众多传感器品牌目前上线产品已达62万件以上。</p>
    </div>
  </div> 
</template>

<script>
export default {
  name: 'AboutUs',
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
@import './scss/index.scss';
</style>
