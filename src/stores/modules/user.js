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
        const res = await getAuthInfo();
        userInfo.value = res.data;
        return res;
      } catch (error) {
        throw error;
      }
    };

    const logout = () => {
      loginData.value = null;
      userInfo.value = null;
      token.value = null;
    };

    return { loginData, userInfo, token, isLogin, login, logout };
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
