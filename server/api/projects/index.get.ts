import { ProjectModel } from "~~/models/project";
import { getServerSession, getToken } from "#auth";
import { AuthToken } from "~~/models/auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  if (token.sub) {
    const projects = await ProjectModel.find({
      users: { $in: token.sub },
    });

    return projects.map((project) => {
      return {
        ...project.toJSON(),
        id: project._id,
      };
    });
  }
  return [];
});
