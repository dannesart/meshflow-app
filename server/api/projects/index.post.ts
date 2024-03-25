import { v4 as uuidv4 } from "uuid";
import { PROJECT_STATUSES, ProjectSchema } from "~~/models/project";
import { ProjectModel } from "~~/models/project.db";
import type { AuthToken } from "~~/models/auth";

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
  // const session = await getServerSession(e);
  // const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  const body = await readBody(e);
  const newProjectObject = newProject(body.name, "Missing token" || "");
  const valid = body ? await ProjectSchema.safeParse(newProjectObject) : false;
  if (valid) {
    const projectDoc = new ProjectModel(newProjectObject);
    await projectDoc.save();
    return newProjectObject;
  }
  return false;
});
