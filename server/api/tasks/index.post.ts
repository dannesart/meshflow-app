import { Task, TaskSchema } from "~~/models/tasks";
import { getServerSession } from "#auth";
import { v4 as uuidv4 } from "uuid";
import { TaskModel } from "~~/models/tasks.db";

const newProject = (
  title: string,
  createdBy: string,
  status: string,
  tags: string[]
) => {
  const task: Task = {
    id: uuidv4(),
    title,
    status,
    createdBy,
    created: new Date(),
    updatedBy: createdBy,
    updated: new Date(),
    tags,
  };
  return task;
};

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  const body = await readBody(e);
  const newTaskObject = newProject(
    body.title,
    session.user.email || "",
    body.status,
    body.tags
  );
  const valid = body ? await TaskSchema.safeParse(newTaskObject) : false;
  if (valid) {
    const taskDoc = new TaskModel(newTaskObject);
    await taskDoc.save();
    return newTaskObject;
  }
  return false;
});
