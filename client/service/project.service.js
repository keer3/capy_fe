import HTTP from '../utils/http'
export default class ProjectService extends HTTP {
  findProjectByUser ({ userId }) {
    return this.get(`project/findProjectByUser?userId=${userId}`)
  }

  addProject (params = {}) {
    return this.post('project/addProject', params)
  }

  delProject (params = {}) {
    return this.post('project/delProject', params)
  }

  updateProjectInfo (params = {}) {
    return this.post('project/updateProjectInfo', params)
  }
}
