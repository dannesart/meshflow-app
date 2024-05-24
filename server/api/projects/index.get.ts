import { ProjectModel } from "~~/models/project.db";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (e) => {
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
