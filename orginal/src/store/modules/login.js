const state = {
  // filterData: {},
  isLogin: false,
  isShowLogin: false,
  isCheck0003: true
}

const actions = {
  
}

const getters = {   //实时监听state值的变化(最新状态)
  
};

const mutations = {
  setLogin(state, val) {
    state.isLogin = val
  },
  
  showLoginDialogn(state, val) {
    state.isShowLogin = val
  },
  setCheck0003(state, val) {
    state.isCheck0003 = val
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
