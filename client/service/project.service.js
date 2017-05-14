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

  getProjectInfo ({ projectId }) {
    return this.get(`project/getProjectInfo?projectId=${projectId}`)
  }

  findUserByProject ({ projectId }) {
    return this.get(`project/findUserByProject?projectId=${projectId}`)
  }

  searchUser ({ searchInput, searchType }) {
    return this.get(`user/findUser?searchInput=${searchInput}&searchType=${searchType}`)
  }

  addUserToProject (params = {}) {
    return this.post('project/addUserToProject', params)
  }

  delUserToProject (params = {}) {
    return this.post('project/delUserToProject', params)
  }
}
