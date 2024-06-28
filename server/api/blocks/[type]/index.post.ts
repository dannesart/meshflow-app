import { AuthToken } from "~~/models/auth";
import { v4 as uuidv4 } from "uuid";
import { BlockSchema } from "~~/models/blocks";
import { BlocksDbModel } from "~~/models/blocks.db";
import { serverSupabaseUser } from "#supabase/server";
import protectRoute from "~/server/protectedRoute";

export default defineEventHandler(async (e) => {
  await protectRoute(e);
  const user = await serverSupabaseUser(e);
  const body = await readBody(e);
  if (BlockSchema.safeParse(body)) {
    const { projectId, properties, type } = body;
    const newDoc = new BlocksDbModel({
      createdBy: user.id,
      updatedBy: user.id,
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
