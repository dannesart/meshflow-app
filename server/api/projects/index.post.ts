import {
  Project,
  PROJECT_STATUSES,
  ProjectSchema,
  ProjectModel,
} from "~~/models/project";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "#auth";

const newProject = (name: string, createdBy: string) => {
  const project = {
    id: uuidv4(),
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
