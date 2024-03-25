import { ProjectModel } from "~~/models/project.db";

export default defineEventHandler(async (e) => {
  const email = "dannesart@live.com";

  const project = await ProjectModel.find({
    createdBy: email,
  });

  return project;
});
