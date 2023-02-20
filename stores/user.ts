import { defineStore } from "pinia";
import axios from "axios";
import { TUser } from "~~/models/user";
import { CONFIG } from "~~/server/api/config";

const MOCK_USER: TUser = {
  name: "Danne",
  email: "dannesart@live.com",
  id: "dwaaw",
};

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
        const response = await axios.get(CONFIG.path + "/api/user");
        this.user = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
