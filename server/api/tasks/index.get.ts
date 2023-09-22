import { TaskModel } from "~~/models/tasks.db";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  const { projectId } = getQuery(e);
  const tasks = await TaskModel.find({ projectId: projectId });

  return (
    tasks.map((task) => {
      return {
        ...task.toJSON(),
        id: task._id,
      };
    }) || []
  );
});
