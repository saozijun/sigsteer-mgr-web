import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "@/layouts/MainLayout.vue";
import SystemLayout from "@/layouts/SystemLayout.vue";
import { useUserStore } from "@/stores/modules/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: MainLayout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/screen/index.vue"),
        },
        {
          path: "/service",
          name: "service",
          component: () => import("@/views/screen/service.vue"),
        },
        {
          path: "/signal",
          name: "signal",
          component: () => import("@/views/screen/signal.vue"),
        },
        {
          path: "/backend",
          redirect: "/backend/data/business",
          component: SystemLayout,
          children: [
            {
              path: "/backend/data/business",
              name: "business",
              component: () =>
                import("@/views/backend/data/business/index.vue"),
            },
            {
              path: "/backend/data/signaling",
              name: "signaling",
              component: () =>
                import("@/views/backend/data/signaling/index.vue"),
            },
            {
              path: "/backend/data/document",
              name: "document",
              component: () =>
                import("@/views/backend/data/document/index.vue"),
            },
            {
              path: "/backend/system/trans",
              name: "trans",
              component: () => import("@/views/backend/system/trans/index.vue"),
            },
            {
              path: "/backend/system/parameter",
              name: "parameter",
              component: () =>
                import("@/views/backend/system/parameter/index.vue"),
            },
            {
              path: "/backend/system/period",
              name: "period",
              component: () =>
                import("@/views/backend/system/period/index.vue"),
            },
            {
              path: "/backend/system/baseStation",
              name: "baseStation",
              component: () =>
                import("@/views/backend/system/baseStation/index.vue"),
            },
            {
              path: "/backend/log/fileLog",
              name: "fileLog",
              component: () => import("@/views/backend/log/fileLog/index.vue"),
            },
            {
              path: "/backend/system/user",
              name: "user",
              component: () => import("@/views/backend/system/user/index.vue"),
            },
            {
              path: "/backend/system/role",
              name: "role",
              component: () => import("@/views/backend/system/role/index.vue"),
            },
            {
              path: "/backend/system/menu",
              name: "menu",
              component: () => import("@/views/backend/system/menu/index.vue"),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/views/error/404.vue"),
      hidden: true,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const { isLogin } = userStore;
  if (to.path === "/login") {
    if (isLogin) next("/");
    else next();
  } else {
    if (isLogin) next();
    else next("/login");
  }
});
export default router;
