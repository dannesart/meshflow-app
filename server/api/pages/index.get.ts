import { PageModel } from "~~/models/page.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }
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
