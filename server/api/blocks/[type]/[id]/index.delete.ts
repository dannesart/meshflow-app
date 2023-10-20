import { getServerSession } from "#auth";
import { BlocksDbModel } from "~~/models/blocks.db";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  try {
    const id = e.context.params?.id;
    const block = await BlocksDbModel.findOneAndDelete({ _id: id }).exec();
    return true;
  } catch (error) {
    return false;
  }
});
