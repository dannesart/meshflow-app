import Joi from "Joi";

const TASK_STATUSES: string[] = ["todo", "doing", "on hold", "done"];

type TTask = {
  title: string;
  description: string;
  deadline?: Date;
  status: string;
  id: string;
  favorite: boolean;
  createdBy: string;
  created: Date;
  tags?: string[];
};

const TaskValidator = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  description: Joi.string().min(10).max(300).required(),
  deadline: Joi.date(),
  status: Joi.string().required(),
});

export { TaskValidator, TTask, TASK_STATUSES };
