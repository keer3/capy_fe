import HTTP from '../utils/http'
export default class ProjectService extends HTTP {

  getGroupList ({ projectId }) {
    return this.get(`apiGroup/list?projectId=${projectId}`)
  }

  renameGroup (params = {}) {
    return this.post('apiGroup/rename', params)
  }

  delGroup (params = {}) {
    return this.post('apiGroup/del', params)
  }

  addGroup (params = {}) {
    return this.post('apiGroup/add', params)
  }

  getAllApi ({ projectId }) {
    return this.get(`api/getAllApi?projectId=${projectId}`)
  }

  getApiByGroup ({ groupId }) {
    return this.get(`api/getApiByGroup?groupId=${groupId}`)
  }

  delApi (params = {}) {
    return this.post('api/delApi', params)
  }

}
