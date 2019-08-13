<template>
  <div class="pay-type">
    <div :class="{'active':payType==='wx'}" @click="checkPayType('wx')">
      <img src="/assets/img/pay-wx.png">
    </div>
    <div :class="{'active':payType==='ali'}" @click="checkPayType('ali')">
      <img src="/assets/img/pay-ali.png">
    </div>
  </div>   
</template>

<script>
export default {
  name: 'PayType',
  props: {
    payType: {
      type: String,
      required: true
    },
    detail: {
      type: Object,
      required: true
    }
  },
  created() {
    this.setData(this.payType)
  },
  methods: {
    checkPayType(payType) {
      this.setData(payType)
      this.$emit('update:payType', payType)
    },
    setData(tag) {
      let { Free, Price, Title } = this.detail
      let msg = Free ? `打赏-${Title}` : `付费-${Title}`
      let req = {
        BizNo: 0,
        For: Free ? 4 : 3, // 1 需方订单 2 需方框架 3 付费阅读 4 打赏
        Method: 1,
        Subject: msg,
        Body: msg,
        Amount: Price,
        ReturnUrl: this.getReturnUrl()
      }
      if (tag === 'ali') {
        // req.ThirdPaymentPlatform = 1
        req.ThirdPaymentPlatform = 64
      } else if (tag === 'wx') {
        req.ThirdPaymentPlatform = 2
      }
      this.$emit('getData', req)
    },
    getReturnUrl() {
      let url = window.location.href.replace(/\?.+$/, '')
      let opts = this.urlGet()
      if (opts.wx) {
        delete opts.wx
      }
      if (opts.Trade_Status) {
        delete opts.Trade_Status
      }
      if (opts.BizNo) {
        delete opts.BizNo
      }
      return url + this.urlSet(opts)
    },
    urlGet(name) {
      let url = window.location.href
      let result = {},
        res = {}
      if (url.split('?').length > 1) {
        var str = url.split('?')[1],
          items = str.split('&')

        for (var i = 0, len = items.length; i < len; ++i) {
          res = items[i].split('=')
          result[res[0]] = res[1]
        }
        if (name) return result[name]
      }

      return result
    },
    urlSet(opts) {
      if (opts.length) {
        let result = '?'
        for (let key in opts) {
          result += key + '=' + opts[key] + '&'
        }

        result = result.replace(/&$/, '')
        return result
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pay-type {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  & > div {
    width: 120px;
    height: 50px;
    border: 1px solid $border-color;
    padding: 6px 5px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.active {
  border-color: rgba(0, 204, 102, 1) !important;
}
</style>

