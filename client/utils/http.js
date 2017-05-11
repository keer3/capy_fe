import { API_HOST } from '../../config/global.config'
import Vue from 'vue'

export default class HttpBase {
  constructor () {
    this.baseUrl = API_HOST
  }

  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      Vue.http.get(this.baseUrl + url, params).then(res => {
        this._msgHandler(res)
        resolve(res)
      }).catch(err => {
        this._errHandler(err)
        reject(err)
      })
    })
  }

  post (url, params = {}) {
    console.log('post')
    return new Promise((resolve, reject) => {
      Vue.http.post(this.baseUrl + url, params).then(res => {
        this._msgHandler(res)
        resolve(res)
      }).catch(this._errHandler)
    })
  }

  upload (url, params = {}) {
    return new Promise((resolve, reject) => {
      this.$ajax({
        type: 'POST',
        url: this.baseUrl + url,
        contentType: false,
        processData: false,
        data: params
      }).then(res => {
        this._msgHandler(res)
        resolve(res)
      }).catch(this._errHandler)
    })
  }

  _msgHandler (body) {

  }

  _errHandler (err) {
    if (err.status === 0) {
      Vue.prototype.$notify({
        message: '系统发生错误咯,请联系管理员!',
        type: 'error'
      })
    }
  }
}
