import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getAuthInfo } from "@/api/login";

export const useUserStore = defineStore(
  "user",
  () => {
    const loginData = ref(null);
    const userInfo = ref(null);
    const token = ref(null);
    const isLogin = computed(() => !!token.value);
    const login = async (data) => {
      loginData.value = data;
      token.value = data.token;
      try {
        await getInfo();
        return { token: token.value };
      } catch (error) {
        throw error;
      }
    };
    const getInfo = async () => {
      const res = await getAuthInfo();
      userInfo.value = res.data;
    };
    const logout = () => {
      loginData.value = null;
      userInfo.value = null;
      token.value = null;
    };
    return {
      loginData,
      userInfo,
      token,
      isLogin,
      login,
      logout,
      getInfo,
    };
  },
  {
    // 开启持久化
    persist: {
      key: "user-store",
      storage: localStorage,
      paths: ["token", "userInfo", "loginData"],
    },
  }
);
