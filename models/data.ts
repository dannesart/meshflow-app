import { z } from "zod";

const DataModelSchema = z
  .object({
    name: z.string().min(3).max(50),
    status: z.string(),
    id: z.string().optional(),
    description: z.string().optional(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date(),
    tags: z.array(z.string()),
    projectId: z.any(),
    properties: z.any(),
  })
  .strict();

type DataModel = z.infer<typeof DataModelSchema>;

const DataSchema = DataModelSchema.extend({
  type: z.string(),
}).omit({
  name: true,
  description: true,
});

type Data = z.infer<typeof DataSchema>;

export { DataModelSchema, DataSchema, DataModel, Data };
