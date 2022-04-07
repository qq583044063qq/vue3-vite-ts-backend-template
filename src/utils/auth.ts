import Cookies from 'js-cookie'
export const TokenKey = 'Template_token' //本地存储token 的key
export function getToken() {
  let token = Cookies.get(TokenKey)

  if(token == undefined) {
    return ''
  }else{
    return token
  }
}

export function setToken(token:string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}