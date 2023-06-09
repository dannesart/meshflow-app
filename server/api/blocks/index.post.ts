import { Model, ModelSchema } from "~~/models/model";
import { getServerSession } from "#auth";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  // newBlockModel(name, session.user.email || '', projectId, description )
  const body = await readBody(e);
  if (ModelSchema.safeParse(body)) {
    const { name, projectId, description } = body;
    // const newDoc = new ModelDbModel({
    //   name,
    //   createdBy: session.user.email,
    //   updatedBy: session.user.email,
    //   projectId,
    //   description,
    //   fields: [],
    //   id: uuidv4(),
    //   serviceType: "block",
    // });
  }

  return false;
});
