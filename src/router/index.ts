import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './module/base-routes'
// 这里要扩展声明一下路由类型中的meta 是有title的
declare module 'vue-router' {
  interface RouteMeta {
    // 是可选的
    title:string
  }
}
const router = createRouter({
  // 使用 hash 模式构建路由（ url中带 # 号的那种)
  history: createWebHashHistory(),
  // 使用 history 模式构建路由 （ url 中没有 # 号，但生产环境需要特殊配置）
  // history: createWebHistory(),
  routes
})

export default router