import { z } from "zod";
import type { Project } from "./project";
import { Schema, model, Model } from "mongoose";

// This is the DB schema. Based on project type
const ProjectDbSchema: Schema<Project> = new Schema({
  name: String,
  status: String,
  id: { type: String, unique: true },
  createdBy: String,
  created: { type: Date, default: Date.now },
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  users: [String],
});

const ProjectModel: Model<Project> = model("projects", ProjectDbSchema);

export { ProjectModel };
