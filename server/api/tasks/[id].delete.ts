import { TaskModel } from "~~/models/tasks.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  const id = e.context?.params?.id;
  try {
    const taskDoc = TaskModel.findOneAndDelete({ _id: id });
    return taskDoc;
  } catch (error) {
    return error;
  }
});
