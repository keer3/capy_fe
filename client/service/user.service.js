import HTTP from '../utils/http'
export default class UserService extends HTTP {
  login (params = {}) {
    return this.post('user/login', params)
  }
}
