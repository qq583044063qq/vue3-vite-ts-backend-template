import BaseLayout from '../../components/layouts/BaseLayout.vue'
export default [
  {
    path: '/',
    redirect: '/dashbord',
    component: BaseLayout,
    meta: { title: '工作空间' },
    children: [
      {
        path: 'analysis',
        component: () => import('../../views/Analysis/index.vue'),
        meta: { title: '分析页' },
      },
      {
        path: 'console',
        component: () => import('../../views/Console/index.vue'),
        meta: { title: '控制台' },
      },
      {
        path: 'dashbord',
        component: () => import('../../views/Dashbord/index.vue'),
        meta: { title: '仪表盘'},
      }
    ]
  },
  {
    path: '/error',
    component: BaseLayout,
    meta: { title: '错误'},
    children:[
      {
        path: '401',
        component: () => import('../../views/Error/401.vue'),
        meta: { title: '401' }
      },
      {
        path: '403',
        component: () => import('../../views/Error/403.vue'),
        meta: { title: '403' },
      },
      {
        path: '404',
        component: () => import('../../views/Error/404.vue'),
        meta: { title: '404' },
      },
      {
        path: '500',
        component: () => import('../../views/Error/500.vue'),
        meta: { title: '500' },
      }
    ]
  },
  {
    path: '/system',
    redirect: 'index',
    component: BaseLayout,
    meta: { title: '系统管理' },
    children: [
      {
        path: 'index',
        component: () => import('../../views/System/index.vue'),
        meta: { title: '系统管理主页' },
      },
      {
        path: 'user',
        component: () => import('../../views/System/user/index.vue'),
        meta: { title: '用户管理' },
      },
      {
        path: 'role',
        component: () => import('../../views/System/role/index.vue'),
        meta: { title: '角色管理' },
      }
    ]
  },{
    path: '/result',
    component: BaseLayout,
    meta: { title: '错误页面' },
    children: [
      {
        path: 'success',
        component: () => import('../../views/Result/success.vue'),
        meta: { title: '成功页面' },
      },
      {
        path: 'failure',
        component: () => import('../../views/Result/failure.vue'),
        meta: { title: '失败页面' },
      },
    ]
  },
  {
    path: '/login',
    component: () => import('../../views/Login/index.vue'),
    meta: { title: '登录'}
  }
]