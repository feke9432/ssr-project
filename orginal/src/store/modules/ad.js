import { baseAPI } from '@/services'
import { Ad } from '@api'
const state = {
  searchListTop: [],
  searchBarBottom: []
}

const actions = {
  getAdList({}, filterData = {}) {
    return baseAPI.request(Ad.QueryAdByPosition, filterData).then(res => {
      let adList = res.AdList.sort((a, b) => {
        return b.Weight - a.Weight
      }).map(item => {
        var author = 'Talk 工控'
        if (item.ExtendData) {
          if (item.ExtendData.Summary) {
            author = item.ExtendData.Summary
          }
        }
        return {
          Title: item.Title,
          CoverImage: item.CoverImg,
          Top: false,
          Author: author,
          DisplayTime: item.CreateTime,
          Link: item.Link,
          ...item
        }
      })
      return adList
    })
  }
}

const mutations = {
  setSearchBarBottom(state, list) {
    state.searchBarBottom = list
  },
  setSearchListTop(state, list) {
    state.searchListTop = list
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
