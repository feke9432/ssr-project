<template>
  <div
    ref="navBar"
    class="nav-bar"
    :style="style"
  >
    <div
      class="content"
      style=""
    >
      <div>
        <h1>
          <router-link to="/home/all">
            <div class="home-title">
              <img src="/assets/img/talkgk-logo.png" alt="Talk工控">
            </div>
          </router-link>
          <span class="top-bar-more-msg">
            <img src="/assets/img/slogn.png" alt="技术员的快乐社区" srcset="">
          </span>
        </h1>
      </div>
      <div class="search">
        <div class="search-input">
          <div class="search-icon" @click="goToSearch(false)">
            <i class="el-icon-search" />
          </div>
          <el-select
            filterable
            remote
            placeholder="请输入关键词"
            default-first-option	
            clearable
            :value="dTerms"
            :loading="loading"
            allow-create
            :remote-method="remoteMethod"
            @change="handleChange"
            @clear="handleClear"
          >
            <el-option
              v-for="item in articleSearchList"
              :key="item.Id"
              :label="item.Title"
              :value="item.Title" 
            >
              <strong v-html="highlighted(item)" />
            </el-option>
          </el-select>           
        </div>
        <div class="hot-list">
          <span 
            v-for="(item,index) in searchBarBottom"
            :key="index"
            class=" ellipsis" 
            :style="`color:${item.Color?item.Color:'#fff'}`"
            @click="goToSearch(item.Title)"
          >
            {{ item.Title }}
          </span>          
        </div>
      </div>
      <div class="more-jump">
        <div v-if="isLogin" class="top-bar-label">
          <el-popover
            placement="bottom"
            width="170"
            trigger="hover"
          >
            <div class="top-bar-avatar-content">
              <div class="avatar-msg text-blue ellipsis">你好，{{ userInfo.NickName }}</div>
              <div class="avatar-msg ellipsis" @click="goPersonal">我的主页</div>
              <div class="avatar-msg ellipsis" @click="goAdmin">我的发布平台</div>
              <div class="avatar-msg ellipsis" @click="logOff">[ 退出登录 ]</div>
            </div>
            <Avatar 
              slot="reference" 
              class="avatar" 
              :size="20" 
              :src="userInfo.Avatar" 
            />
          </el-popover>
        </div>
        <span v-else class="top-bar-label" @click="$store.commit('login/showLoginDialogn', true)">登录</span>
        <a 
          v-if="userInfo.Type !== 1" 
          class="top-bar-label" 
          href="https://wj.qq.com/s2/4167772/d56d/" 
          target="_blank"
        >申请企业账号</a>
        <el-popover
          placement="bottom"
          width="200"
          trigger="hover"
        >
          <div class="top-bar-hover-content">
            <img src="/assets/img/qrcode.png" alt="">
            <div class="hover-content-msg">
              <p>微信扫一扫</p>
              <p>Talk工控移动端</p>
            </div>
          </div>
          <label slot="reference" class="top-bar-label hover">Talk工控移动端</label>
        </el-popover>
        <span class="top-bar-label">
          <a class="text-red" href="https://www.51mydao.com" target="_blank">传感器购买</a>
        </span>
      </div>
    </div>
    <logon @loginSuccess="handleLogin" />
    <rbTool />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
// import logon from '@/components/logon'
// import Avatar from '@/components/common/avatar'
// import rbTool from '../common/rbTool'
export default {
  name: 'TopBar',
  // components: { logon, Avatar, rbTool },
  data() {
    return {
      search: '',
      style: '',
      width: '100%',
      left: 0,
      showDialog: false,
      dTerms: '',
      options: [],
      loading: false,
      userInfo: {
        Avatar: ''
      }
    }
  },
  computed: {
    ...mapState({
      isLogin(state) {
        this.userInfo = this.$mdUtils.getUserInfo()
        return state.login.isLogin
      }
    }),
    ...mapState('topBar', {
      totalRecord: 'totalRecord',
      articleSearchList: 'articleSearchList',
      terms: 'terms'
    }),
    ...mapState('ad', {
      searchBarBottom: 'searchBarBottom'
    })
  },
  watch: {
    $route: {
      handler() {
        this.$nextTick(() => {
          this.dTerms = this.terms ? this.terms : ''
        })
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    this.getWindowWidth()
    this.handleLogin()
    this.$store.dispatch('ad/getAdList', { PositionName: 'cms-pc-search-list-top', AdNum: 2 }).then(res => {
      this.setSearchListTop(res)
    })
    this.$store.dispatch('ad/getAdList', { PositionName: 'cms-pc-search-bar-bottom', AdNum: 5 }).then(res => {
      this.setSearchBarBottom(res)
    })
    this.userInfo = this.$mdUtils.getUserInfo()
  },
  methods: {
    ...mapMutations('topBar', ['setTerms']),
    ...mapMutations('ad', ['setSearchBarBottom', 'setSearchListTop']),
    handleChange(val) {
      if (val) {
        this.setTerms(val)
        this.goToSearch()
      }
    },
    handleClear() {
      this.dTerms = ''
      this.setTerms()
    },
    highlighted(item) {
      return item.Title.replace(new RegExp('(' + this.terms + ')', 'ig'), function($1, match) {
        return '<span style="color:#db0000;">' + match + '</span>'
      })
    },
    remoteMethod(val) {
      if (val) {
        this.setTerms(val)
        this.sendSearch()
      }
    },
    goToSearch(terms) {
      if (terms) {
        this.setTerms(terms)
        this.jump()
      } else {
        this.terms && this.jump()
      }
    },
    jump() {
      this.sendSearch()
        .then(() => {
          let { name } = this.$route
          if (name === 'home') {
            this.$router.push({ name: 'search', params: { terms: this.terms } })
          } else {
            this.$router.replace({ name: 'search', params: { terms: this.terms } })
          }
        })
        .catch(() => {})
    },
    sendSearch() {
      if (this.terms) {
        this.loading = true
        return this.$store.dispatch('topBar/sendSearch', { Terms: this.terms }).finally(() => (this.loading = false))
      } else {
        return Promise.reject()
      }
    },
    getWindowWidth() {
      let reg = /,/g
      window.addEventListener('resize', () => {
        this.width = window.innerWidth <= 1190 ? `width: ${1190}px` : `width: ${window.innerWidth}px`
        this.style = `${this.width},left:-${this.left}`
        this.style = this.style.replace(reg, ';')
      })
      window.addEventListener('scroll', () => {
        this.left = `${document.documentElement.scrollLeft || document.body.scrollLeft}px`
        this.style = `${this.width},left:-${this.left}`

        this.style = this.style.replace(reg, ';')
      })
    },
    handleLogin() {
      let isLogin = Boolean(this.$mdUtils.getUserInfo('Id'))
      this.setLogin(isLogin)
    },
    goPersonal() {
      let routeUrl = this.$router.resolve({ name: 'personal', params: { id: this.$mdUtils.getUserInfo('Id'), type: 'all' } })
      window.open(routeUrl.href, '_blank')
    },
    goAdmin() {
      this.$mdUtils.goAuthor()
    },
    logOff() {
      this.$store.commit('login/setCheck0003', false)
      this.$mdUtils.logOff(true)
    },
    ...mapMutations('login', ['setLogin'])
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  min-width: 1190px;
  height: 80px;
  z-index: 999;
  background-color: rgba(43, 50, 63, 1);
  color: #fff;
  margin-bottom: 10px;
  .content {
    display: flex;
    align-items: center;
    height: 100%;
  }
  h1 {
    margin: 0;
    padding-left: 10px;
    a,
    span {
      display: inline-block;
      vertical-align: middle;
    }
    .home-title {
      color: #fff;
      height: 80px;
      width: 140px;
      position: relative;

      img {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 140px;
        height: 50px;
        vertical-align: middle;
      }
    }
  }
  .search {
    width: 370px;
    margin: 0 auto;
    .search-input {
      position: relative;
    }
  }
  .more-jump {
    .top-bar-label {
      display: inline-block;
      margin-left: 20px;
      cursor: pointer;
      font-size: 12px;
      color: #fff;

      &.hover {
        line-height: 20px;
      }
    }
    .avatar {
      vertical-align: middle;
      width: 40px;
      height: 40px;
    }
  }
}
.top-bar-hover-content {
  img {
    width: 100%;
  }
  .hover-content-msg {
    text-align: center;
    font-weight: bold;
    color: $main;
  }
}
.top-bar-avatar-content {
  .avatar-msg {
    line-height: 28px;
    font-size: 12px;
    cursor: pointer;
  }
  .avatar-msg + .avatar-msg {
    border-top: 1px solid $border-color;
  }
}
.hot-list {
  margin-top: 5px;
  font-size: 12px;
  padding-left: 15px;
  span {
    display: inline-block;
    max-width: 60px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 1190px;
  margin: 0 auto;
}

.top-bar-more-msg {
  margin-left: 12px;
  line-height: 1.2;
  font-size: 14px;
  color: #fff;
}
</style>

<style lang="scss">
.search {
  position: relative;
  overflow: hidden;

  .el-select {
    width: 100%;
    line-height: 30px;
    .el-input__suffix {
      right: 50px !important;
      i {
        line-height: 30px !important;
      }
      top: 50% !important;
      transform: translateY(-50%) !important;
    }
  }
  .search-icon {
    position: absolute;
    top: 50%;
    right: 0;
    width: 50px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    transform: translateY(-50%);
    z-index: 99;
    cursor: pointer;
    &:hover .el-input__inner {
      border-color: $red !important;
    }
  }

  .el-input__inner {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding-right: 100px;
    background: #000;
    border: 1px solid #2b323f;
    border-radius: 20px;
    color: #fff;
    &:hover {
      border-color: $red !important;
    }
  }
}
</style>

