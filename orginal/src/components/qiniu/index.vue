<template>
  <div>
    <div class="upload-box">
      <el-upload
        ref="upload"
        :http-request="ownUpload"
        :class="mClassName"
        :list-type="listType"
        action="https://upload.qiniup.com"
        :auto-upload="autoUpload"
        :accept="mold.accept"
        :data="uploadForm"
        :show-file-list="showFileList"
        :on-change="handleChange"
        :on-error="handleError"
        :on-success="handleSuccess"
        :on-progress="handleProgress"
        :on-remove="handleRemove"
        :file-list="defaultList"
      >
        <slot name="input" :loading="loading" />
      </el-upload>
      <slot name="btn" />
      <div v-if="localShowProgress && showProgress" class="progress">
        <el-progress :percentage="uploadProgressNum" :color="progressColor" />
      </div>
    </div>
    <div
      v-show="hasTips"
      slot="tip"
      style="white-space: nowrap; margin-top: 10px;"
      class="el-upload__tip"
    >
      {{ mold.tips }}
    </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs'
import { Common } from '@/api'
import * as qiniu from "qiniu-js";
export default {
  name: 'Qiniu',
  props: {
    mClassName: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    defaultList: {
      type: Array,
      default: function() {
        return []
      }
    },
    hasTips: {
      type: Boolean,
      default: true
    },
    listType: {
      type: String,
      default: 'picture'
    },
    // 是否显示图片列表
    showFileList: {
      type: Boolean,
      default: false
    },
    maxImag: {
      type: Number,
      default: 1
    },
    // 只能上传一张
    isOnlyOne: {
      type: Boolean,
      default: true
    },
    autoUpload: {
      type: Boolean,
      default: true
    },
    mold: {
      type: Object,
      default: function() {
        return {
          type: ['image/jpeg', 'image/png'],
          accept: 'image/jpeg,image/png',
          tips: '只能上传 jpg/png 文件，且不超过 500kb',
          sizeError: '上传图片大小不能超过 500KB!',
          moldError: '上传图片只能为 JPG/PNG 格式!',
          isSize: function(size) {
            return size / 1024 < 500
          }
        }
      }
    },
    accept: {
      type: String,
      default: ''
    },
    showProgress: {
      type: Boolean,
      default: false
    },
    progressColor: {
      type: String,
      default: '#db0000'
    }
  },
  data() {
    return {
      bucketHost: 'https://img.51mydao.com',
      uploadForm: {
        key: '',
        token: ''
      },
      fileList: [],
      uploadProgressNum: 0,
      localShowProgress: false,
      fileType: 'image'
    }
  },
  created() {
    this.fileType = /image/.test(this.mold.accept) ? 'image' : 'video'
  },
  methods: {
    // 上传
    submitUpload() {
      this.$refs.upload.submit()
    },
    clearFilesUpload() {
      this.$refs.upload.clearFiles()
    },
    // 处理上传类型
    handleType(type) {
      return this.mold.type.some(item => {
        return item === type
      })
    },
    handleRemove(file, fileList) {
      this.handleOnlyOne(fileList)
    },
    async handleChange(file, list) {
      if (this.handleType(file.raw.type)) {
        let _rawFile = await this.compressPic(file.raw)
        let isVali = this.validata(_rawFile)
        if (!isVali) list.pop()
      } else {
        this.$message.error(this.mold.moldError)
        list.pop()
      }
      this.handleOnlyOne(list)
      this.$emit('changeList', file, list)
    },
    handleProgress(event, file, fileList) {
      this.localShowProgress = true
      this.uploadProgressNum = Math.floor(event.percent)
      this.$emit('onProgress', this.uploadProgressNum, event, file, fileList)
      if (this.uploadProgressNum === 100) {
        this.localShowProgress = false
      }
    },
    validata(file) {
      const isType = this.handleType(file.type)
      const isSize = this.mold.isSize(file.size)
      if (!isType) {
        this.$message.error(this.mold.moldError)
        return false
      }
      if (!isSize) {
        this.$message.error(this.mold.sizeError)
        return false
      }
      return true
    },
    handleOnlyOne(list) {
      if (this.maxImag === 1 && list.length > 1) {
        list.shift()
      } else if (list.length > this.maxImag) {
        list.pop()
        this.$message.error(`抱歉只能同时上传${this.maxImag}张图片!`)
      }

      let upload = document.querySelector('.el-upload--picture-card')
      if (list.length >= this.maxImag) {
        this.$nextTick(() => {
          upload.style.display = 'none'
        })
      } else {
        this.$nextTick(() => {
          upload.style.display = 'inline-block'
        })
      }
    },
  
    getQiniuToken() {
      return this.$api(Common.GetQiNiuToken, {})
    },
    initFileName(file) {
      let date = +new Date()
      let name = encodeURIComponent(file.name)
      name = name.replace(/%/g, '')
      return `${date}_${name}`
    },
    handleSuccess(response, file, list) {
      this.$nextTick(() => {
        if (response) {
          file.baseUrl = this.bucketHost + '/' + response.key
          this.$emit('resultUrlList', file, list)
          this.$emit('update:loading', false)
        }
      })
    },
    handleError() {
      this.$emit('update:loading', false)
      this.$emit('handleError')
    },
    compressPic(rawFile) {
      return new Promise(rel => {
        new Compressor(rawFile, {
          maxWidth: 640,
          success(processedFile) {
            rel(processedFile)
          }
        })
      }).catch(err => {
        console.log('img compress error: ', err)
      })
    },
    async ownUpload(options) {
      let { file } = options
      file = await this.compressPic(file)
      this.$emit('update:loading', true)
      this.getQiniuToken()
        .then(resp => {
          let uploadForm = {
            key: this.initFileName(file),
            token: resp
          }
          return uploadForm
        })
        .then((uploadForm) => {
          let {key, token} = uploadForm
          var observable = qiniu.upload(file, key, token);
          observable.subscribe({
            next: options.onProgress,
            error: options.onError,
            complete: options.onSuccess
          });
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-box {
  flex-wrap: wrap;
}
.progress {
  width: 100%;
}
</style>

