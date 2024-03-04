import { model, Model, Schema } from "mongoose";
import { Settings } from "./settings";

const SettingsDbSchema: Schema<Settings> = new Schema({
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
  settings: {
    activeServices: [String],
    useSprints: Boolean,
  },
});

const SettingsModel: Model<Settings> = model("settings", SettingsDbSchema);

export { SettingsModel };
