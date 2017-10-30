// 配置API接口地址
var root = '/api/v1'

// 引用axios
var axios = require('axios')

// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString().call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull (obj) {
  for (var key in obj) {
    if (obj[key] === null) {
      delete obj[key]
    }
    if (toType[key] === 'string') {
      obj[key] = obj[key].trim()
    } else if (toType[key] === 'object') {
      obj[key] = filterNull(obj[key])
    } else if (toType[key] === 'array') {
      obj[key] = filterNull(obj[key])
    }
  }
  return obj
}

/*
 接口处理函数
 每个项目都是不一样的
 */

function apiAxios (method, url, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  axios({
    method: method,
    url: url,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    baseURL: root,
    withCredentials: false
  })
    .then(function (res) {
      if (res.data.success === true) {
        if (success) {
          success(res.data)
        }
      } else {
        if (failure) {
          failure(res.data)
        } else {
          alert('error:' + JSON.stringify(res.data))
        }
      }
    })
    .catch(function (err) {
      if (err) {
        window.alert('api error, HTTP CODE: ' + err.status)
      }
    })
}

// 输出在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  }
}
