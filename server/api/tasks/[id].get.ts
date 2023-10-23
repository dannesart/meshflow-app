import { TaskModel } from "~~/models/tasks.db";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  try {
    const { projectId } = getQuery(e);
    const id = e.context.params?.id;
    const task = await TaskModel.find({ _id: id, projectId: projectId }).exec();
    return task;
  } catch (error) {
    return false;
  }
});
