import { TaskModel } from "~~/models/tasks.db";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  const tasks = await TaskModel.find({});

  return tasks || [];
});
