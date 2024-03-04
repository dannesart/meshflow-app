import { z } from "zod";

const SettingsSchema = z
  .object({
    settings: z.object({
      activeServices: z.array(z.string()).optional(),
      useSprints: z.boolean(),
    }),
    id: z.string().optional(),
    updatedBy: z.string(),
    updated: z.date(),
    projectId: z.any(),
  })
  .strict();

type Settings = z.infer<typeof SettingsSchema>;

export { SettingsSchema, Settings };
