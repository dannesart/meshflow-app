import { model, Model, Schema } from "mongoose";
import { Page } from "./page";
import { BlocksDbModel } from "./blocks.db";

const PageDbSchema: Schema<Page> = new Schema({
  title: String,
  status: String,
  createdBy: String,
  created: { type: Date, default: Date.now },
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  slug: String,
  blocks: [{ type: Schema.Types.ObjectId, ref: BlocksDbModel }],
  tags: [String],
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
});

const PageModel: Model<Page> = model("pages", PageDbSchema);

export { PageModel };
