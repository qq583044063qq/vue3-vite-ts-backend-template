//页面认证授权 管理 无授权重定向管理
import router from './router'
// import { useStore } from 'vuex'
import { key, store } from './store'
import { ElMessage } from 'element-plus'
import { getToken } from './utils/auth' // get token from cookie
import getPageTitle from './utils/getPageTitle'
import np from 'nprogress'
import 'nprogress/nprogress.css' // progress bar style
// const store = useStore(key)
// 一个极简进度条 可以与路由守卫很好配合
np.configure({ showSpinner: false }) // NProgress Configuration
// 不进行重定向的页面路径 如登录， 错误页面等
const whiteList = ['/login','/error/401','/error/403','/error/404','/error/405'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  np.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()
  // 如果有token 则如果路由是去登录则重定向到主页
  if (hasToken) {
    if (to.path === '/login') {
      //目标为登录则重定向到主页
      next({ path: '/' })
      np.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        //如果没有用户信息就去拿一下用户信息
        try {
          store.dispatch('user/getInfo').then(res => {
            next()
          }).catch(error => {
            store.dispatch('user/resetToken')
            ElMessage.error(error || 'Has Error')
            next(`/login?redirect=${to.path}`)
          })
          
        } catch (error) {
          //获取用户信息失败之后则重置程序身份验证信息
          store.dispatch('user/resetToken')
          ElMessage.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          np.done()
        }
      }
    }
  }else{
    //没有token
    //看去的页面在不在认证白名单里面
    if(whiteList.indexOf(to.path)!==-1){
      // 直接通过
      next()
    }else{
      //需要认证
      next(`/login?redirect=${to.path}`)
      np.done()
    }
  }
})
// 路由守卫 在路由跳转之后
router.afterEach((to, from, next) => {
  // finish progress bar
  np.done()
  // set page title
  document.title = getPageTitle(to.meta.title)
})