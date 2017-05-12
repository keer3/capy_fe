import HTTP from '../utils/http'
export default class ProjectService extends HTTP {
  findProjectByUser ({ userId }) {
    return this.get(`project/findProjectByUser?userId=${userId}`)
  }
}
