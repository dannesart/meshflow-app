import { PageModel } from "~~/models/page.db";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const { projectId } = getQuery(e);
  const pages = await PageModel.find({ projectId: projectId }).populate(
    "blocks"
  );
  return (
    pages.map((page) => {
      const pageJson = page.toJSON();
      return {
        ...pageJson,
        id: page._id,
      };
    }) || []
  );
});
