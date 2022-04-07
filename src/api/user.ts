import request from '../utils/request'
import { UserLoginInfo } from '../interface/globelInterface'
export function login(data: UserLoginInfo) {
  return request({
    url: '/User/login',
    method: 'post',
    data
  })
}
export function getInfo(token:string) {
  return request({
    url: '/User/info',
    method: 'get',
    params: { token }
  })
}
export function logout() {
  return request({
    url: '/User/logout',
    method: 'post'
  })
}