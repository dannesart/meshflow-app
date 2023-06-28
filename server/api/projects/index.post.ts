import {
  PROJECT_STATUSES,
  ProjectSchema,
  ProjectModel,
} from "~~/models/project";
import { getServerSession } from "#auth";

const newProject = (name: string, createdBy: string) => {
  const project = {
    name,
    status: PROJECT_STATUSES[0],
    createdBy,
    created: new Date(),
    updatedBy: createdBy,
    updated: new Date(),
  };
  return project;
};

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  const body = await readBody(e);
  const newProjectObject = newProject(body.name, session.user.email || "");
  const valid = body ? await ProjectSchema.safeParse(newProjectObject) : false;
  if (valid) {
    const projectDoc = new ProjectModel(newProjectObject);
    await projectDoc.save();
    return newProjectObject;
  }
  return false;
});
