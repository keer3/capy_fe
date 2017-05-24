import HTTP from '../utils/http'
export default class UserService extends HTTP {
  login (params = {}) {
    return this.post('user/login', params)
  }

  getCode ({ phone }) {
    return this.get(`user/code?phone=${phone}`)
  }

  reg (params = {}) {
    return this.post('user/reg', params)
  }

  forgetPsd (params = {}) {
    return this.post('user/forgetPsd', params)
  }
}
