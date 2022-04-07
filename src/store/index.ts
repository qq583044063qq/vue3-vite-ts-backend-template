// store.ts
// 由于这个玩意导入时候 无法导入, 但源码里面是定义了的,这里再次扩展一下
declare module '@vue/runtime-core'{
  interface InjectionKey<T> extends Symbol {

  }
}
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'
import getters from './getters'
import user from './modules/user'
// 为全局的store声明一个AllState
import { AllState } from './interface'
// 为了使用injectionKey 手动强行指定里面有个这个玩意

// 定义injectionKey
export const key: InjectionKey<Store<AllState>> = Symbol()

const modules = {
  user
}
const mutations = {
  SET_SIDEBAR: (state: AllState, sideBarIsCollapse: boolean) => {
    state.sideBarIsCollapse = sideBarIsCollapse
  }
}
export const store =createStore<AllState>({
  modules,
  mutations,
  getters
})


