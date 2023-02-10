export const NOTIFICATION_TYPES = ["warning", "success", "info", "error"];
export const NOTIFICATION_TIME = 5;

export type TNotification = {
  type?: string;
  title: string;
  body: string;
};
