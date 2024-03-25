import { v4 as uuidv4 } from "uuid";
import { AuthToken } from "~~/models/auth";
import { SettingsModel } from "~~/models/settings.db";
import { Settings } from "~/models/settings";

const newSetting = (settings: any, createdBy: string, projectId: string) => {
  const page: Settings = {
    settings,
    updatedBy: createdBy,
    updated: new Date(),
    projectId,
  };
  return page;
};

export default defineEventHandler(async (e) => {
  // const session = await getServerSession(e);
  // const token: AuthToken = (await getToken({ event: e })) as AuthToken;
  // if (!session || !session.user) {
  //   return { error: "Need to be authenticated" };
  // }

  const body = await readBody(e);
  const { settings, projectId } = body;
  const updatedObject: Omit<Settings, "projectId" | "id"> = {
    updated: new Date(),
    updatedBy: "Missing token" || "",
    settings,
  };
  try {
    const pageDoc = await SettingsModel.findOneAndUpdate(
      { projectId },
      updatedObject,
      {
        upsert: true,
      }
    );
    return pageDoc;
  } catch (error) {
    return error;
  }
});
