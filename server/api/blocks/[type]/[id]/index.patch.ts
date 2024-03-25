import { AuthToken } from "~~/models/auth";
import { Block } from "~~/models/blocks";
import { BlocksDbModel } from "~~/models/blocks.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  const body = await readBody(e);
  const id = e.context.params?.id;
  const { status, properties, tags } = body;
  const updatedObject: Omit<
    Block,
    "createdBy" | "created" | "projectId" | "id" | "serviceType"
  > = {
    updated: new Date(),
    updatedBy: "Missing token",
    properties,
    status,
    tags,
  };
  //   const valid = await PageSchema.safeParse(updatedObject);
  //   if (valid.success) {
  try {
    const blockDoc = await BlocksDbModel.findOneAndUpdate(
      { _id: id },
      updatedObject,
      {
        upsert: true,
      }
    );
    return blockDoc;
  } catch (error) {
    return error;
  }
  //   } else {
  //     return valid.error; // or handle the validation error accordingly
  //   }
});
