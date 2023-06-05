import { Schema } from "mongoose";
import { z } from "zod";

const ModelTypeSchema = z.object({
  name: z.string(),
  id: z.string(),
  description: z.string().optional(),
  format: z.string(),
  icon: z.string().optional(),
});
type ModelType = z.infer<typeof ModelTypeSchema>;

const ModelFieldSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(3),
  type: ModelTypeSchema,
  linkType: z.string().optional(),
  validations: z.object({
    required: z.boolean().default(() => false),
    minMax: z.object({
      use: z.boolean(),
      min: z.number().optional(),
      max: z.number().optional(),
    }),
  }),
});
type ModelField = z.infer<typeof ModelFieldSchema>;

const ModelSchema = z.object({
  name: z.string().min(3),
  id: z.string(),
  description: z.string().optional(),
  fields: z.array(ModelFieldSchema),
  createdBy: z.string(),
  created: z.date().default(() => new Date()),
  updatedBy: z.string(),
  updated: z.date().default(() => new Date()),
  projectId: z.any(),
  serviceType: z.string(),
});
type Model = z.infer<typeof ModelSchema>;

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

// Types
export { ModelType, ModelField, Model };
// Schemas for validation
export { ModelTypeSchema, ModelFieldSchema, ModelSchema };
// DB Schemas
export { ModelDbSchema };
