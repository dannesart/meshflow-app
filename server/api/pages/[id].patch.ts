import { PageModel } from "~~/models/page.db";
import { v4 as uuidv4 } from "uuid";
import { getServerSession } from "#auth";
import { Page, PageSchema } from "~~/models/page";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  const body = await readBody(e);
  const id = e.context.params?.id;
  const { updatedBy, status, tags, title, slug, blocks } = body;
  const updatedObject: Omit<
    Page,
    "createdBy" | "created" | "projectId" | "id"
  > = {
    updated: new Date(),
    updatedBy,
    status,
    tags,
    title,
    slug,
    blocks,
  };
  //   const valid = await PageSchema.safeParse(updatedObject);
  //   if (valid.success) {
  try {
    const pageDoc = await PageModel.findOneAndUpdate(
      { _id: id },
      updatedObject,
      {
        upsert: true,
      }
    );
    return pageDoc;
  } catch (error) {
    return error;
  }
  //   } else {
  //     return valid.error; // or handle the validation error accordingly
  //   }
});
