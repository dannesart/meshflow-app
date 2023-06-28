import { z } from "zod";

const PAGE_STATUSES: string[] = ["public", "private"];

const PageSchema = z
  .object({
    title: z.string().min(3).max(50),
    status: z.string(),
    id: z.string().optional(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date(),
    tags: z.array(z.string()),
    blocks: z.array(z.string()),
    projectId: z.any(),
  })
  .strict();

type Page = z.infer<typeof PageSchema>;

export { PageSchema, Page, PAGE_STATUSES };
