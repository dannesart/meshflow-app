import { Model, ModelSchema } from "~~/models/model";
import { getServerSession, getToken } from "#auth";
import { AuthToken } from "~~/models/auth";
import { v4 as uuidv4 } from "uuid";
import { ModelDbModel } from "~~/models/model.db";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  const body = await readBody(e);
  if (ModelSchema.safeParse(body)) {
    const { name, projectId, description, fields } = body;
    const newDoc = new ModelDbModel({
      name,
      createdBy: token.sub,
      updatedBy: token.sub,
      projectId,
      description,
      fields: fields || [],
      id: uuidv4(),
      serviceType: "data",
    });
    await newDoc.save();
    return newDoc.toJSON();
  }

  return false;
});
