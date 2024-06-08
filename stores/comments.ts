import axios from "axios";
import { defineStore } from "pinia";
import { TComment } from "~~/models/comments";

type TCommentsState = {
  _comments: TComment[];
};

export const useCommentsStore = defineStore("CommentsStore", {
  state: () => <TCommentsState>{ _comments: [] },
  getters: {
    comments: (state) => state._comments,
    commentById: (state) => {
      return (commentId: string) =>
        state._comments.find((comment) => comment.id === commentId);
    },
  },
  actions: {
    async fetchComments() {
      try {
        const config = useRuntimeConfig();
        const response = await axios.get(
          config.public.REDIRECT_URI + "/api/comments"
        );
        this._comments = response.data;
      } catch (error) {
        //TODO: Handle error
      }
    },
  },
});
