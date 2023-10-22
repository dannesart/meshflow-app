import { Schema, model } from "mongoose";
import { Block } from "./blocks";

// This is the DB schema. Based on project type
const BlockDbSchema: Schema<Block> = new Schema({
  id: { type: String, unique: true },
  properties: {},
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
  createdBy: String,
  created: { type: Date, default: Date.now },
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  type: { type: Schema.Types.ObjectId, ref: "models" },
});
const BlocksDbModel = model("blocks", BlockDbSchema);

export { BlocksDbModel, BlockDbSchema };
