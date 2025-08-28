import router, { constantRoutes, mainRoutes } from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isPathMatch } from '@/utils/validate'
import { useUserStore } from '@/stores/modules/user.js'
import usePermissionStore from '@/stores/modules/permission.js'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

const isWhiteList = (path) => {
  return whiteList.some(pattern => isPathMatch(pattern, path))
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  
  if (userStore.token) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else if (isWhiteList(to.path)) {
      next()
    } else {
      // 用户信息已加载，检查路由是否已生成
      if (permissionStore.routes && permissionStore.routes.length > constantRoutes.concat(mainRoutes).length) {
        next()
      } else {
        // 生成动态路由
        permissionStore.generateRoutes().then(accessRoutes => {
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
        }).catch(err => {
          userStore.logout().then(() => {
            next({ path: '/' })
          });
        })
      }
    }
  } else {
    // 没有token
    if (isWhiteList(to.path)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
