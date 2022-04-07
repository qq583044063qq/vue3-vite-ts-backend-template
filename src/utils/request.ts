import axios from 'axios'
import { ElMessage } from 'element-plus'
// import { useStore } from 'vuex'
import { key, store } from '../store'
import { TokenKey, getToken } from './auth'
import appSetting from '../Setting'
// const store =useStore(key)
// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: appSetting.apiBaseUrl,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 发起请求之前获取用户token
      if (config.headers) {
        let tokenSchme = "Bearer";
        config.headers["Authorization"] = tokenSchme + ' ' + getToken()
      }
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor 响应拦截器
service.interceptors.response.use(
  /**
  * If you want to get http information such as headers or status
  * Please return  response => response
 */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 设定200到300之间为正确执行
    if (response.status >= 200 && response.status < 400) {
      // 处理完重定向的其他的就算正确获取到数据直接返回
      // 状态码为230代表为退出登录操作成功
      if (response.status == 230) {
        store.dispatch('user/resetToken').then(() => {
          ElMessage({
            message: response.data,
            type: 'success',
            duration: 5 * 1000
          })
        })
      } else {

      }
      return response
    }
    else {
      // 如果是401状态码则表示没有登录请去登录
      if (response.status == 401) {
        ElMessage({
          message: response.data,
          type: 'error',
          duration: 5 * 1000
        })
        store.dispatch('user/resetToken').then(() => {
        //移除了 token后刷新页面 通过路由的登录检测会自动跳转到登录页
        location.reload()
        })
      }
      // 如果状态码为403则表示登录了但没有权限访问该内容
      if (response.status == 403) {
        return Promise.reject(new Error('获取数据失败,用户没有权限'))
      }
      // 如果为400则表示客户端的数据有误
      if (response.status == 400) {
        return Promise.reject(new Error('请求错误，' + response.data))
      }
      return Promise.reject(new Error('获取数据失败, 状态码: ' + response.status + '状态文本: ' + response.statusText))
    }
  },
  error => {
    console.log(error.response) // for debug
    // 请求错误中有响应返回 则取响应返回的数据
    if (error.response) {
      ElMessage({
        message: error.response.data,
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      ElMessage({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service