import { ProjectModel } from "~~/models/project.db";
import type { AuthToken } from "~~/models/auth";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }
  const email = "dannesart@live.com";

  const projects = await ProjectModel.find({
    users: { $in: email },
  });

  return projects.map((project) => {
    return {
      ...project.toJSON(),
      id: project._id,
    };
  });
});
