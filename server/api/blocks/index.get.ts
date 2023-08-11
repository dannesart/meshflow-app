import { getServerSession } from "#auth";
import { ModelDbModel } from "~~/models/model.db";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  const blocks = await ModelDbModel.find({});

  return (
    blocks.map((block) => {
      return {
        ...block.toJSON(),
        id: block._id,
      };
    }) || []
  );
});
