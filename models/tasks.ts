import { z } from "zod";

const TASK_STATUSES: string[] = [
  "backlog",
  "todo",
  "doing",
  "reviewing",
  "on hold",
  "testing",
  "done",
];

const TaskSchema = z
  .object({
    title: z.string().min(3).max(50),
    description: z.string().min(0).max(300).optional(),
    deadline: z.date().optional(),
    assignedTo: z.string().optional(),
    status: z.string(),
    id: z.string(),
    createdBy: z.string(),
    created: z.date(),
    updatedBy: z.string(),
    updated: z.date().default(() => new Date()),
    tags: z.array(z.string()),
    subTasks: z
      .array(
        z.object({
          title: z.string(),
          done: z.boolean(),
        })
      )
      .optional(),
  })
  .strict();

type Task = z.infer<typeof TaskSchema>;

export { TaskSchema, Task, TASK_STATUSES };
