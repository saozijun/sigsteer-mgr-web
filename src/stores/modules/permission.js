import router, { constantRoutes, mainRoutes } from "@/router";
import { getRouters } from "@/api/menu";
import { defineStore } from "pinia";
import SystemLayout from "@/layouts/SystemLayout.vue";


// 匹配views里面所有的.vue文件
const modules = import.meta.glob("./../../views/**/*.vue");

const usePermissionStore = defineStore("permission", {
  state: () => ({
    routes: [],
    addRoutes: [],
    sidebarRouters: [],
  }),
  actions: {
    setRoutes(routes) {
      this.addRoutes = routes;
      this.routes = constantRoutes.concat(mainRoutes).concat(routes);
    },
    setSidebarRouters(routes) {
      this.sidebarRouters = routes;
    },
    generateRoutes(roles) {
      return new Promise((resolve) => {
        getRouters()
          .then((res) => {
            const sdata = JSON.parse(JSON.stringify(res.data));
            const rewriteRoutes = filterAsyncRouter(sdata);

            // 将动态路由添加到backend路由下
            rewriteRoutes.forEach((route) => {
              router.addRoute("backend", route);
            });
            this.setSidebarRouters(sdata);
            this.setRoutes(rewriteRoutes);
            resolve(rewriteRoutes);
          })
          .catch((err) => {
            resolve([]);
          });
      });
    },
  },
});

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, lastRouter = false, type = false) {
  return asyncRouterMap.filter((route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children);
    }

    // 处理组件
    if (route.component) {
      if (route.children && route.children.length > 0) {
        delete route.component;
        // 设置redirect到第一个子路由
        if (route.children.length > 0) {
          route.redirect = route.children[0].path;
        }
      } else if (route.component === "Layout") {
        // 如果某个路由明确指定了Layout，则转换为SystemLayout
        route.component = SystemLayout;
      } else {
        route.component = loadView(route.component);
      }
    }

    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type);
    } else {
      delete route["children"];
      delete route["redirect"];
    }

    return true;
  });
}

function filterChildren(childrenMap, lastRouter = false) {
  var children = [];
  childrenMap.forEach((el) => {
    el.path = lastRouter ? lastRouter.path + "/" + el.path : el.path;
    if (el.children && el.children.length && el.component === "ParentView") {
      children = children.concat(filterChildren(el.children, el));
    } else {
      children.push(el);
    }
  });
  return children;
}

export const loadView = (view) => {
  let res;
  for (const path in modules) {
    const dir = path.replace(/^.*views\//, "").replace(".vue", "");
    if (dir === view) {
      res = () => modules[path]();
      break;
    }
  }
  return res;
};

export default usePermissionStore;
