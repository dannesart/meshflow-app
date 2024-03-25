import { TUser } from "~~/models/user";
import axios from "axios";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  const token = await getToken({ event: e });

  if (token) {
    return token;
  } else if (session) return session.user;

  return false;
});
