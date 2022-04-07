export interface RootState {
  appId?: string,
  appVersion?: string
}
// 用户模块接口定义
export interface UserState {
  token: string,
  name: string,
  avatar: string,
  roles: string[],
  introduction: string,
  email: string
}
// 所有模块包含的state
export interface AllState extends RootState {
  user: UserState,
  sideBarIsCollapse: boolean
}
