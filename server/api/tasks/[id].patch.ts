import { TaskSchema, Task } from "~~/models/tasks";
import { TaskModel } from "~~/models/tasks.db";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  const body = await readBody(e);
  const {
    created,
    updated,
    createdBy,
    updatedBy,
    assignedTo,
    projectId,
    description,
    deadline,
    estimate,
    status,
    id,
    subTasks,
    tags,
    title,
  } = body;
  const updatedObject: Task = {
    created: new Date(created),
    updated: new Date(),
    description,
    createdBy,
    updatedBy,
    assignedTo,
    projectId,
    status,
    subTasks,
    tags,
    title,
  };
  if (deadline) {
    updatedObject.deadline = new Date(deadline);
  }
  if (estimate) {
    updatedObject.estimate = estimate;
  }
  const valid = await TaskSchema.safeParse(updatedObject);
  if (valid.success) {
    try {
      const taskDoc = await TaskModel.findOneAndUpdate(
        { _id: id },
        updatedObject,
        {
          upsert: true,
        }
      );
      return taskDoc;
    } catch (error) {
      return error;
    }
  } else {
    return valid.error; // or handle the validation error accordingly
  }
});
