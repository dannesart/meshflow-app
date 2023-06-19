import { TaskSchema, Task } from "~~/models/tasks";
import { TaskModel } from "~~/models/tasks.db";
import { v4 as uuidv4 } from "uuid";
import { getServerSession, getToken } from "#auth";
import { AuthToken } from "~~/models/auth";

const newTask = (
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
  const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  const body = await readBody(e);
  const newTaskObject = newTask(
    body.title,
    token.sub || "",
    body.status,
    body.tags
  );
  const valid = await TaskSchema.safeParse(newTaskObject);
  if (valid.success) {
    try {
      const taskDoc = new TaskModel(newTaskObject);
      await taskDoc.save();
      return newTaskObject;
    } catch (error) {
      return error;
    }
  } else {
    return valid.error; // or handle the validation error accordingly
  }
});
