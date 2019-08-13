import store from 'store'
// import router from '@/router'
// import vuex from '@/store'
// import { baseAPI } from '@/services'
// import { Account } from '@/api'
// import { Message } from 'element-ui'

// import { Dialog } from 'vant';
class MdUtils {
  constructor() {
    this.tokenKey = 'token'
    this.userInfoKey = 'u_info'
    this.keepAliveList = 'keepAliveList'
  }

  clone(item) {
    return JSON.parse(JSON.stringify(item))
  }

  getStore(key) {
    return store.get(key)
  }

  setStore(key, val) {
    store.set(key, val)
  }

  remove(key) {
    store.remove(key)
  }

  getToken() {
    return this.getStore(this.tokenKey)
  }

  setToken(val) {
    this.setStore(this.tokenKey, val)
  }

  setUserInfo(val) {
    this.setStore(this.userInfoKey, val)
  }

  getUserInfo(key) {
    let uInfo = store.get(this.userInfoKey) || {}
    return key ? uInfo[key] : uInfo
  }

  setKeepAlive(list) {
    this.setStore(this.keepAliveList, list)
  }

  getKeepAlive() {
    return this.getStore(this.keepAliveList)
  }

  removeKeepAlive() {
    this.remove(this.keepAliveList)
  }

  commitRemoveKeepAlive(list) {
    let type = Object.prototype.toString.call(list)
    if (type === '[object Array]') {
      let keepAliveList = this.getStore('keepAliveList')
      let flag = keepAliveList.filter(item => {
        return !list.find(subItem => item === subItem)
      })
      this.setStore('keepAliveList', flag)
    }
  }

  logOff(shouMsg) {
    // baseAPI.request(Account.LogOut, {})
    //   .then(() => {
    //     vuex.commit('login/setLogin', false)
    //     this.remove(this.tokenKey)
    //     this.remove(this.userInfoKey)
    //     this.removeKeepAlive()
    //     if (vuex.state.login.isCheck0003) {
    //       vuex.commit('login/showLoginDialogn', true)
    //       shouMsg && Message.success('退出成功')
    //     } else {
    //       vuex.commit('login/setCheck0003', true)
    //       shouMsg && Message.success('退出成功')
    //     }
        
    //   })
    //   .catch(() => {
    //     Message.error('服务器正忙，请刷新重试')
    //   })
  }
  randomString(L) {
    var s = ''
    var randomchar = () => {
      var n = Math.floor(Math.random() * 62)
      if (n < 10) return n // 1-10
      if (n < 36) return String.fromCharCode(n + 55) // A-Z
      return String.fromCharCode(n + 61) // a-z
    }
    while (s.length < L) s += randomchar()
    return s
  }
  UrlParamGet(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    let index = window.location.href.indexOf('?')
    let r = window.location.href.substr(index + 1).match(reg)
    if (r) {
      // 操作 URI 中的“组成部分”应当使用 decodeURIComponent 会对参数中的保留字符（; / ? : @ & = + $ ,）进行转译
      return decodeURIComponent(r[2])
    }
    return ''
  }

  wxLogOnAction() {
    vuex.commit('login/showLoginDialogn', true)
  }

  MarkeStr(str, searchVal) {
    let key = searchVal.split('') //拆分词
    let titleStr = str.replace(new RegExp(`[${key}]`, 'ig'), s => `<span style='color:red'>${s}</span>`) // g是global全局搜索 i是ignore case 忽略大小写
    return titleStr
  }

  //判断是否是微信浏览器的函数
  isWeiXin() {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase()
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  }

  // 判断元素是否可见
  elementIsVisibleInViewport(el, partiallyVisible = false) {
    const { top, left, bottom, right } = el.getBoundingClientRect()
    const { innerHeight, innerWidth } = window
    return partiallyVisible ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) && ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
  }

  // 登录后直接跳转作者后台
  goAuthor() {
    let userId = this.getUserInfo('Id')
    let token = this.getToken()
    if (token && userId) {
      let url = process.env.VUE_APP_AUTHOR_URL
      // let url = 'http://192.168.1.140:8089'
      window.open(`${url}/#/home?outloginid=${userId}&token=${token}`)
    }
  }
}

export default new MdUtils()
