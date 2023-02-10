import { defineStore } from "pinia";
import { TNotification, NOTIFICATION_TIME } from "~~/models/notification";

type TNotificationState = {
  _notification: TNotification | null;
  _notifications: TNotification[];
  _queue: TNotification[];
};

export const useNotificationStore = defineStore("NotificationStore", {
  state: () =>
    <TNotificationState>{ _notifications: [], _notification: null, _queue: [] },
  getters: {
    notifications: (state) => state._notifications as TNotification[],
    notification: (state) => state._notification as TNotification | null,
  },
  actions: {
    setNotification(title: string, body: string, type?: string) {
      if (this._notification) {
        this._queue.unshift({ title, body, type });
        return;
      }
      this._notification = {
        title,
        body,
        type,
      };
      this._job();
    },
    _job() {
      setTimeout(() => {
        this._notification = null;
        if (this._queue && this._queue.length) {
          const { title, body, type } = this._queue.pop() as TNotification;
          this.setNotification(title, body, type);
        }
      }, NOTIFICATION_TIME);
    },
  },
});
