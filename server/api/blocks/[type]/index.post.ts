import { getServerSession, getToken } from "#auth";
import { AuthToken } from "~~/models/auth";
import { v4 as uuidv4 } from "uuid";
import { BlockSchema } from "~~/models/blocks";
import { BlocksDbModel } from "~~/models/blocks.db";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  // newBlockModel(name, session.user.email || '', projectId, description )
  const body = await readBody(e);
  if (BlockSchema.safeParse(body)) {
    const { projectId, properties, type } = body;
    const newDoc = new BlocksDbModel({
      createdBy: token.sub,
      updatedBy: token.sub,
      projectId,
      properties: properties || {},
      id: uuidv4(),
      type,
    });
    await newDoc.save();
    return newDoc.toJSON();
  }

  return false;
});
