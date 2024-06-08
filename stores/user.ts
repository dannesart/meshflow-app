import { defineStore } from "pinia";
import axios from "axios";
import { TUser } from "~~/models/user";

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
        const config = useRuntimeConfig();
        // const { email, nickname, name, picture } = useAuth0().user.value;
        // console.log({ email, nickname, name, picture });
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/user"
        );
        if (response.data) {
          this.setUser(response.data);
        }
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
