import { z } from "zod";

const PAGE_STATUSES: string[] = ["public", "private"];

const PageSchema = z
  .object({
    title: z.string().min(3).max(50),
    status: z.string(),
    id: z.string(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date(),
    tags: z.array(z.string()),
    blocks: z.array(z.string()),
  })
  .strict();

type TPage = z.infer<typeof PageSchema>;

export { PageSchema, TPage, PAGE_STATUSES };
