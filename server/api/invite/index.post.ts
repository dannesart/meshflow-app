import { InviteSchema } from "~~/models/invite";
import type { AuthToken } from "~~/models/auth";
import { InviteDbModel } from "~~/models/invite.db";

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }
  // newBlockModel(name, session.user.email || '', projectId, description )
  const body = await readBody(e);
  if (InviteSchema.safeParse(body)) {
    const { projectId, email } = body;
    const newDoc = new InviteDbModel({
      email,
      createdBy: "Missing token",
      projectId,
    });
    await newDoc.save();
    return newDoc.toJSON();
  }

  return false;
});
