import { defineStore } from "pinia";
import { USER_INFO } from "./userConstant";
import { getUserInfo } from "./userApi";
import UserType = User.UserType;

export const useUserStore = defineStore("user", {
  state: () => ({
    userInfo: {
      ...USER_INFO
    }
  }),
  getters: {},
  persist: {
    key: "user-store",
    storage: window.localStorage,
    beforeRestore: (context) => {
      console.log("load userStore data start");
    },
    afterRestore: (context) => {
      console.log("load userStore data end");
    }
  },
  actions: {
    async getAndSetUserInfo() {
      const res: any = await getUserInfo();
      if (res.code === 200 && res.data) {
        this.userInfo = res.data;
      } else {
        console.error("登录失败");
        this.$reset();
      }
    },
    setUserInfo(user: UserType) {
      this.userInfo = user;
    }
  }
});
