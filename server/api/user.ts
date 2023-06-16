import { TUser } from "~~/models/user";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (session && session.user) {
    return session.user;
  }
  return false;
});
