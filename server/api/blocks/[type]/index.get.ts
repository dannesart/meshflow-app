import { BlocksDbModel } from "~~/models/blocks.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }
  const { projectId } = getQuery(e);
  const type = e.context.params?.type;
  const blocks = await BlocksDbModel.find({ projectId: projectId, type });

  return (
    blocks.map((block) => {
      return {
        ...block.toJSON(),
        id: block._id,
      };
    }) || []
  );
});
