import { ProjectModel } from "~~/models/project";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  if (session.user.email) {
    const project = await ProjectModel.find({
      createdBy: session.user.email,
    });

    return project;
  }
  return {};
});
