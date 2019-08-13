import { baseAPI } from '@/services'
import { Cms } from '@api'
const state = {
  terms: '',
  articleSearchList: []
}

const actions = {
  async sendSearch({ commit }, filterData = {}) {
    let resp = await baseAPI.request(Cms.Search, filterData)
    commit('getArtice', resp)
    return resp
  }
}

const mutations = {
  getArtice(state, { TotalRecord = 0, List = [] }) {
    state.articleSearchList = List
    state.totalRecord = TotalRecord
  },
  setTerms(state, value) {
    state.terms = value
    if (!state.terms) {
      state.articleSearchList = []
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
