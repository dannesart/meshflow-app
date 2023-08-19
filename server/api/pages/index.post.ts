import { v4 as uuidv4 } from "uuid";
import { getServerSession, getToken } from "#auth";
import { AuthToken } from "~~/models/auth";
import { Page, PageSchema } from "~~/models/page";
import { PageModel } from "~~/models/page.db";

const newPage = (
  title: string,
  createdBy: string,
  status: string,
  slug: string,
  tags: string[],
  blocks: string[],
  projectId: string
) => {
  const page: Page = {
    title,
    status,
    createdBy,
    blocks,
    slug,
    created: new Date(),
    updatedBy: createdBy,
    updated: new Date(),
    tags,
    projectId,
  };
  return page;
};

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }

  const body = await readBody(e);
  const newPageObject = newPage(
    body.title,
    token.sub || "",
    body.status,
    body.slug,
    body.tags,
    body.blocks,
    body.projectId
  );
  const valid = await PageSchema.safeParse(newPageObject);
  if (valid.success) {
    try {
      const pageDoc = new PageModel(newPageObject);
      await pageDoc.save();
      return newPageObject;
    } catch (error) {
      return error;
    }
  } else {
    return valid.error; // or handle the validation error accordingly
  }
});
