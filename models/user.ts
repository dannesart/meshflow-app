import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  id: z.string(),
  sub: z.string().optional(),
  nickname: z.string().min(1),
  image: z.string().optional(),
});

type TUser = z.infer<typeof UserSchema>;

export { UserSchema, TUser };
