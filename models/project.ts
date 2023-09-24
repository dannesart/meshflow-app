import { z } from "zod";
import { Schema, model, Model } from "mongoose";

// All statuses that projects can have
const PROJECT_STATUSES: string[] = ["active", "archived"];

// This is the project schema. It can be used for validation.
const ProjectSchema = z
  .object({
    name: z.string().min(3).max(50),
    status: z.string(),
    id: z.string(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date(),
    users: z.array(z.string()),
  })
  .strict();

// This is the type based on project schema
type Project = z.infer<typeof ProjectSchema>;

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

export { ProjectSchema, Project, PROJECT_STATUSES, ProjectModel };
