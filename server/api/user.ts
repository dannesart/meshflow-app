import { TUser } from "~~/models/user";

export default defineEventHandler(async (e) => {
  const user: TUser = {
    name: "Danne",
    email: "dannesart@live.com",
    id: "adawda453534",
  };
  return user;
});
