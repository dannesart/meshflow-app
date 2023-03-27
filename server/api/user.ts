import { TUser } from "~~/models/user";

export default defineEventHandler(async (e) => {
  const sessions = e.context.sessions;
  return e.context;
});
