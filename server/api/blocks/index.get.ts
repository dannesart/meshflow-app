import { ModelDbModel } from "~~/models/model.db";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const { projectId } = getQuery(e);
  const blocks = await ModelDbModel.find({
    projectId: projectId,
    serviceType: "block",
  });

  return (
    blocks.map((block) => {
      return {
        ...block.toJSON(),
        id: block._id,
      };
    }) || []
  );
});
