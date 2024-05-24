import { v4 as uuidv4 } from "uuid";
import { TaskSchema, Task } from "~~/models/tasks";
import { TaskModel } from "~~/models/tasks.db";
import protectRoute from "~/server/protectedRoute";
import { serverSupabaseUser } from "#supabase/server";

const newTask = (
  title: string,
  createdBy: string,
  status: string,
  tags: string[],
  projectId: string
) => {
  const task: Task = {
    title,
    status,
    createdBy,
    created: new Date(),
    updatedBy: createdBy,
    updated: new Date(),
    id: uuidv4(),
    tags,
    projectId,
  };
  return task;
};

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);

  const body = await readBody(e);
  const newTaskObject = newTask(
    body.title,
    user.id,
    body.status,
    body.tags,
    body.projectId
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
