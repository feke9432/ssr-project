import Vue from 'vue'

export default {
  // SET_ACTIVE_TYPE: (state, { type }) => {
  //   state.activeType = type
  // },

  // SET_LIST: (state, { type, ids }) => {
  //   state.lists[type] = ids
  // },

  // SET_ITEMS: (state, { items }) => {
  //   items.forEach(item => {
  //     if (item) {
  //       Vue.set(state.items, item.id, item)
  //     }
  //   })
  // },

  // SET_USER: (state, { id, user }) => {
  //   Vue.set(state.users, id, user || false) /* false means user not found */
  // },
  SET_ARTICLES: (state, data) => {
    if (data && data.Body.List) {
      data.Body.List.forEach(item => {
        state.articles[item.Id] = item
      })
    }
  },
  SET_ARTICLE_DETAIL: (state, data) => {
    if (data && data.Body.Id) {
      state.detail = data.Body
    }
  }
}
