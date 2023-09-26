import { z } from "zod";

const BLOCK_STATUSES: string[] = ["public", "private"];

const BlockModelSchema = z
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

type BlockModel = z.infer<typeof BlockModelSchema>;

const BlockSchema = BlockModelSchema.extend({
  type: z.string(),
});

type Block = z.infer<typeof BlockSchema>;

export { BlockModelSchema, BlockSchema, BlockModel, Block, BLOCK_STATUSES };
