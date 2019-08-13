import Vue from 'vue'
import { baseAPI } from '@/services'
import { Cms } from '@api'
const state = {
  currPage: null,
  sideBar: []
}

const actions = {
  send({ commit }) {
    return baseAPI.request(Cms.QueryCategory, {}).then(res => {
      commit('setCategory', res)
      return res
    })
  }
}

const mutations = {
  setFilterData(state, data) {
    let flag = state.sideBar.find(item => item.Name === state.currPage)
    if (flag) {
      data.Type = 1
      data.CategoryId = undefined
      if (flag.Id === 0) {
        data.Type = 1
      } else if (flag.Id === 1) {
        data.Type = 2
      } else if (flag.Id > 1) {
        data.Type = 0
        data.CategoryId = flag.Id
      }
      Vue.set(flag, 'filterData', data)
    }
  },
  setCategory(state, data) {
    let list = [
      {
        Id: 0,
        Name: '推荐',
        title: 'all'
      },
      {
        Id: 1,
        Name: '视频',
        title: 'video'
      },
      ...data.List.map((item, index) => {
        item.title = `page${index}`
        return item
      })
    ]

    list.map(item => {
      let filterData = {
        Type: 1,
        CategoryId: undefined
      }
      filterData.Type = 1
      filterData.CategoryId = undefined
      filterData.PageIndex = 1
      filterData.PageSize = 10
      if (item.Id === 0) {
        filterData.Type = 1
      } else if (item.Id === 1) {
        filterData.Type = 2
      } else if (item.Id > 1) {
        filterData.Type = 0
        filterData.CategoryId = item.Id
      }
      Vue.set(item, 'filterData', filterData)
      Vue.set(item, 'historyTop', 0)
      Vue.set(item, 'loading', false)
      Vue.set(item, 'pageTotal', 0)
    })
    state.sideBar.push(...list)
  },
  setList(state, { list, index }) {
    Vue.set(state.sideBar[index], 'list', list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
