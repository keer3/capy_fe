import {
  API_HOST
} from '../../config/global.config'
import Vue from 'vue'

export default class HttpBase {
  constructor () {
    this.baseUrl = API_HOST
  }

  get (url, params = {}) {
    return new Promise((resolve, reject) => {
      Vue.http.get(this.baseUrl + url, params).then(res => {
        this._msgHandler(res.body)
        resolve(res.body)
      }).catch(err => {
        this._errHandler(err)
        reject(err)
      })
    })
  }

  post (url, params = {}) {
    return new Promise((resolve, reject) => {
      Vue.http.post(this.baseUrl + url, params).then(res => {
        this._msgHandler(res.body)
        resolve(res.body)
      }).catch(this._errHandler)
    })
  }

  _msgHandler (body) {
    const {
      status,
      message
    } = body
    if (status === 401 || status === 500 || status === 403) {
      Vue.prototype.$notify({
        message: message,
        type: 'warning'
      })
      // 如果未登陆状态 则退回到登陆
      if (status === 401) {
        window.router.push({
          path: '/login'
        })
      }
    }
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
