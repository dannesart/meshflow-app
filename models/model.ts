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
  isMain: z.boolean().default(() => false),
  allowMultiple: z.boolean().default(() => false),
  validations: z.object({
    required: z.boolean().default(() => false),
    allowedReferences: z.array(z.string()).optional(),
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

// Types
export { ModelType, ModelField, Model };
// Schemas for validation
export { ModelTypeSchema, ModelFieldSchema, ModelSchema };
