import { z } from "zod";

const TASK_STATUSES: string[] = ["todo", "doing", "on hold", "done"];

const TaskSchema = z
  .object({
    title: z.string().min(3).max(50),
    description: z.string().min(0).max(300).optional(),
    deadline: z.date().optional(),
    status: z.string(),
    id: z.string(),
    createdBy: z.string(),
    created: z.date(),
    tags: z.array(z.string()),
    subTasks: z.array(z.string()).optional(),
  })
  .strict();

type TTask = z.infer<typeof TaskSchema>;

export { TaskSchema, TTask, TASK_STATUSES };
