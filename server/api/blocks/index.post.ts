import { Model, ModelSchema } from "~~/models/model";
import { v4 as uuidv4 } from "uuid";
import { ModelDbModel } from "~~/models/model.db";
import { serverSupabaseUser } from "#supabase/server";
import protectRoute from "~/server/protectedRoute";

const newBlockModel = (
  name: string,
  creator: string,
  projectId: string,
  description: string
) => {
  return {
    name,
    id: uuidv4(),
    fields: [],
    createdBy: creator,
    updatedBy: creator,
    serviceType: "block",
    projectId,
    description,
  };
};

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);

  const body = await readBody(e);
  if (ModelSchema.safeParse(body)) {
    const { name, projectId, description, fields } = body;
    const newDoc = new ModelDbModel({
      name,
      createdBy: user.id,
      updatedBy: user.id,
      projectId,
      description,
      fields: fields || [],
      id: uuidv4(),
      serviceType: "block",
    });
    await newDoc.save();
    return newDoc.toJSON();
  }

  return false;
});
