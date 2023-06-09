import { Schema, model } from "mongoose";
import { Model } from "./model";

// This is the DB schema. Based on project type
const ModelDbSchema: Schema<Model> = new Schema({
  name: String,
  description: String,
  id: { type: String, unique: true },
  fields: [],
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
  createdBy: String,
  created: { type: Date, default: Date.now },
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  serviceType: String,
});
const ModelDbModel = model("models", ModelDbSchema);

export { ModelDbModel };
