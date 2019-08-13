import request from 'axios'
import MdUtils from '../util/mdUtils'

request.defaults.baseURL = 'https://test-api-gateway.51mydao.com'

export function baseRequest(url,data,showErrorTips = true) 
{
  let userId = MdUtils.getUserInfo('Id') || 0
  // console.log(MdUtils)
  let reqMsg = Object.assign({
    Header: {
      Channel: 'CMS-PC',
      Operator: userId
    }
  },data)
  return request.post(url, reqMsg)
  .then((response) => {
    return response.data
  }).catch((error) => {
    console.log(error)
  })
}

export const Search = (data) => {
  let reqMsg = Object.assign({PageIndex: 1, PageSize: 10}, data)
  return baseRequest('/Api/CMS/Search.Search', reqMsg)
}

export const GetUserArticleDetail = (reqMsg) => {
  return baseRequest('/Api/CMS/Article.GetUserArticleDetail', reqMsg)
}
