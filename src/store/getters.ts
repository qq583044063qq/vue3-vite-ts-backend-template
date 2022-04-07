import {  AllState } from './interface';
const getters = {
  //授权用token
  token: (state: AllState) => state.user.token,
  userName: (state:AllState) => state.user.name,
  userAvatar: (state:AllState) => state.user.avatar,
  userRoles: (state:AllState) => state.user.roles,
  userIntroduction: (state:AllState) => state.user.introduction,
  userEmail: (state:AllState) => state.user.email,
  sideBarIsCollapse: (state:AllState) => state.sideBarIsCollapse
}
export default getters;