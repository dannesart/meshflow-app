import { z } from "zod";

export const AuthTokenSchema = z
  .object({
    email: z.string().email(),
    exp: z.number().min(10),
    iat: z.number().min(10),
    jti: z.string(),
    name: z.string(),
    picture: z.string().url(),
    sub: z.string(),
  })
  .strict();

export type AuthToken = z.infer<typeof AuthTokenSchema>;
