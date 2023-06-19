import { TaskModel } from "~~/models/tasks.db";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  const id = e.context?.params?.id;
  try {
    const taskDoc = TaskModel.findOneAndDelete({ id });
    return taskDoc;
  } catch (error) {
    return error;
  }
});
