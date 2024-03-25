import { ModelDbModel } from "~~/models/model.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  try {
    const id = e.context.params?.type;
    const block = await ModelDbModel.findOneAndDelete({ _id: id }).exec();
    return true;
  } catch (error) {
    return false;
  }
});
