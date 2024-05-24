import { v4 as uuidv4 } from "uuid";
import { PROJECT_STATUSES, ProjectSchema } from "~~/models/project";
import { ProjectModel } from "~~/models/project.db";
import { serverSupabaseUser } from "#supabase/server";

const newProject = (name: string, createdBy: string) => {
  const project = {
    name,
    status: PROJECT_STATUSES[0],
    createdBy,
    id: uuidv4(),
    created: new Date(),
    updatedBy: createdBy,
    updated: new Date(),
    users: [createdBy],
  };
  return project;
};

export default defineEventHandler(async (e) => {
  const user = await serverSupabaseUser(e);

  const body = await readBody(e);
  const newProjectObject = newProject(body.name, user.id);
  const valid = body ? await ProjectSchema.safeParse(newProjectObject) : false;
  if (valid) {
    const projectDoc = new ProjectModel(newProjectObject);
    await projectDoc.save();
    return newProjectObject;
  }
  return false;
});
