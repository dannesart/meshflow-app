import { z } from "zod";

const InviteSchema = z
  .object({
    createdBy: z.string(),
    created: z.date(),
    projectId: z.any(),
    email: z.string(),
  })
  .strict();

type Invite = z.infer<typeof InviteSchema>;

export { InviteSchema, Invite };
