import { defineStore } from "pinia";

type State = {
  rules: {
    [id: string]: {
      edit: boolean;
      create: boolean;
      delete: boolean;
      read: boolean;
    };
  };
};

const useRuleStore = defineStore("RulesStore", {
  state: () =>
    <State>{
      rules: {},
    },
  getters: {
    getRuleById: (state) => {
      return (id: string) => {
        return state.rules[id];
      };
    },
    canEdit: (state) => {
      return (id: string) => {
        return !!state.rules[id]?.edit;
      };
    },
    canCreate: (state) => {
      return (id: string) => {
        return !!state.rules[id]?.create;
      };
    },
  },

  actions: {
    getRulesById: (id: string) => {},
  },
});
