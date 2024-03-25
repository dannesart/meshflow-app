import { AuthToken } from "~~/models/auth";
import { Model } from "~~/models/model";
import { ModelDbModel } from "~~/models/model.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  const body = await readBody(e);
  const id = e.context.params?.type;
  const { name, description, fields } = body;
  const updatedObject: Omit<
    Model,
    "createdBy" | "created" | "projectId" | "id" | "serviceType"
  > = {
    updated: new Date(),
    name,
    description,
    updatedBy: "Missing token",
    fields,
  };
  //   const valid = await PageSchema.safeParse(updatedObject);
  //   if (valid.success) {
  try {
    const blockDoc = await ModelDbModel.findOneAndUpdate(
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
