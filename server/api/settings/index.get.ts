import { SettingsModel } from "~~/models/settings.db";
import { getServerSession } from "#auth";

export default defineEventHandler(async (e) => {
  const session = await getServerSession(e);
  if (!session || !session.user) {
    return { error: "Need to be authenticated" };
  }
  const { projectId } = getQuery(e);
  const settings = await SettingsModel.findOne({ projectId: projectId });
  if (!settings)
    return {
      updatedBy: "",
      updated: new Date(),
      projectId,
      settings: {
        activeServices: [],
        useSprints: false,
      },
      id: null,
    };
  const settingJson = settings.toJSON();
  return {
    ...settingJson,
    id: settings._id,
  };
});
