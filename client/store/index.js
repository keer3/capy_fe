import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const state = {
  userInfor: {},
  project: {},
  api: {}
}

const mutations = {
  SAVE_USER_INFOR (state, userInfor) {
    state.userInfor = userInfor
  },
  SAVE_PROJECT (state, project) {
    state.project = project
  },
  SAVE_API (state, api) {
    state.api = api
  }
}

const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 200)
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createLogger()]
})

export default store
