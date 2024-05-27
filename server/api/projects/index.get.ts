import { ProjectModel } from "~~/models/project.db";
import { serverSupabaseUser } from "#supabase/server";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);

  const projects = await ProjectModel.find({
    users: { $in: user.id },
  });

  return projects.map((project) => {
    return {
      ...project.toJSON(),
      id: project._id,
    };
  });
});
