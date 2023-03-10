import { defineStore } from "pinia";
import axios from "axios";
import { TUser } from "~~/models/user";
import { CONFIG } from "~~/server/api/config";

export const useUserStore = defineStore("UserStore", {
  state: () =>
    <{ user: TUser }>{
      user: {},
    },
  getters: {
    currentUser: (state) => state.user,
  },
  actions: {
    setUser(user: TUser) {
      this.user = user;
    },
    async fetchUser() {
      try {
        if (process.client) {
          // const { user } = useAuth0();
          // this.setUser(user.value as TUser);
        }
        // const { email, nickname, name, picture } = useAuth0().user.value;
        // console.log({ email, nickname, name, picture });
        // const response = await axios.get(CONFIG.path + "/api/user", {
        //   headers: {
        //     email,
        //   },
        // });
        // if (email && name && nickname)
        //   this.setUser({ email, nickname, name, id: "324234" });
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
