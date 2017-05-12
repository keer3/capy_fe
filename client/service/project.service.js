import HTTP from '../utils/http'
export default class ProjectService extends HTTP {
  findProjectByUser (params = {}) {
    return this.post('project/findProjectByUser', params)
  }
}
