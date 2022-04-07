import { ActionContext } from "vuex"
import { UserState, RootState } from '../interface'
import { login, logout, getInfo } from '../../api/user'
import { getToken, setToken, removeToken } from '../../utils/auth'
import { UserLoginInfo } from '../../interface/globelInterface'
const getDefaultState = () => {
  var state:UserState = {
    token: getToken(),
    name: '',
    avatar: '@/defaultAvatar.gif',
    roles: [],
    introduction: '',
    email: ''
  };
  return state;
}
const state = getDefaultState()
const getters = {
  token: (state:UserState) => state.token,
  name: (state:UserState) => state.name,
  avatar: (state:UserState) => state.avatar,
  roles: (state:UserState) => state.roles,
  introduction: (state:UserState) => state.introduction,
  email: (state:UserState) => state.email
}
// 同步修改用户状态信息
const mutations = {
  RESET_STATE: (state:UserState) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state:UserState, token:string) => {
    state.token = token
  },
  SET_NAME: (state:UserState, name:string) => {
    state.name = name
  },
  SET_AVATAR: (state:UserState, avatar:string) => {
    state.avatar = avatar
  },
  SET_ROLES: (state:UserState, roles:string[]) => {
    state.roles = roles
  },
  SET_INTRODUCTION: (state:UserState, introduction:string) =>{
    state.introduction=introduction
  },
  SET_EMAIL: (state:UserState, email:string)=>{
    state.email = email
  }
}
//异步操作 登录等
const actions = {
  // 登录
  login(context:ActionContext<UserState, RootState>, userLoginInfo:UserLoginInfo) {
    return new Promise((resolve,reject)=> {
      // 进行登录操作
      login(userLoginInfo).then(response=>{
        const { data } = response
        console.log('logined' + 'userName:' + data.name)
        context.commit('SET_TOKEN', data.token)
        //记得给cookies设置token
        setToken(data.token)
        resolve()
      }).catch(err => {
        resolve(err)
      })
    })
  },
  // 获取用户信息
  getInfo(context:ActionContext<UserState, RootState>){
    return new Promise((resolve,reject)=>{
      // 获取用户信息操作
      getInfo(context.state.token).then(response=>{
        const { data } = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // 默认没写头像信息这里直接就传空字符串 没有的使用空字符串
        const { name, userCode, roles } = data
        console.log(roles)
        context.commit('SET_NAME', name)
        // 这里给用户头像信息设置数据 如果不存在使用默认路径
        // 这里直接使用了默认路径
        context.commit('SET_AVATAR', 'defaultAvatar.gif')
        context.commit('SET_ROLES', roles)
        context.commit('SET_INTRODUCTION', 'userCode:' + userCode)
        context.commit('SET_EMAIL', '')
        resolve(data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  //用户登出操作
  logout(context:ActionContext<UserState, RootState>){
    return new Promise((resolve,reject)=>{
      // 执行登出操作
      logout().then(response=>{
        const { data } = response
        removeToken()
        context.commit('RESET_STATE')
        resolve()
      }).catch(err=>{
        reject(err)
      })
    })
  },
  // 移除token操作
  resetToken(context:ActionContext<UserState, RootState>){
    return new Promise((resolve,reject)=>{
      //执行移除token操作
      removeToken() // must remove  token  first
      //清空状态
      context.commit("RESET_STATE");
      resolve();
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}