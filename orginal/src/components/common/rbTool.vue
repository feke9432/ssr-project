<template>
  <div class="rbTool--components">
    <a
      class="rbTool-btn gary-blue-light"
      href="https://wj.qq.com/s2/4058730/7146/"
      target="_blank"
    >意见</a>
    <div v-if="isHome" class="rbTool-btn gary-blue-light" @click="reload">
      刷新
    </div>
    <div v-move.show="500" class="rbTool-btn go-top gary-blue" @click="goTop">
      返回顶部
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isHome: false
    };
  },
  watch: {
    $route: function(val) {
      this.checkIsHome(val);
    }
  },
  created() {
    this.checkIsHome(this.$route);
  },
  methods: {
    reload() {
      window.location.reload();
    },
    checkIsHome(val) {
      if (val.name === "home") {
        this.isHome = true;
      }
    },
    goTop() {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }
};
</script>
<style lang='scss' scoped>
.rbTool--components {
  position: fixed;
  bottom: 34px;
  left: 50%;
  margin-left: 605px;
}
.rbTool-btn {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 3px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  color: #fff;
}
.go-top {
  padding: 7px 6px;
  line-height: 18px;
  font-size: 14px;
}
.rbTool-btn + .rbTool-btn {
  margin-top: 8px;
}
.gary-blue-light {
  background: $gary-blue-light;
}
.gary-blue {
  background: $gary-blue;
}

@media screen and (max-width: 1314px) {
  .rbTool--components {
    left: auto;
    right: 0;
    margin-left: 0;
  }
}
</style>