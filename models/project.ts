import { z } from "zod";

const PROJECT_STATUSES: string[] = ["active", "archived"];

const ProjectSchema = z
  .object({
    name: z.string().min(3).max(50),
    status: z.string(),
    id: z.string(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date(),
  })
  .strict();

type TProject = z.infer<typeof ProjectSchema>;

export { ProjectSchema, TProject, PROJECT_STATUSES };
