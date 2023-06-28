import { PageModel } from "~~/models/page.db";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  const pages = await PageModel.find({});

  return (
    pages.map((page) => {
      return {
        ...page.toJSON(),
        id: page._id,
      };
    }) || []
  );
});
