import { model, Model, Schema } from "mongoose";
import { string } from "zod";
import { Task } from "./tasks";

const TaskDbSchema: Schema<Task> = new Schema({
  title: String,
  description: String,
  id: { type: String, unique: true },
  status: String,
  deadline: { type: Date },
  createdBy: String,
  created: { type: Date, default: Date.now },
  updatedBy: String,
  updated: { type: Date, default: Date.now },
  tags: [String],
  subTasks: [
    {
      done: Boolean,
      title: String,
    },
  ],
});

const TaskModel: Model<Task> = model("tasks", TaskDbSchema);

export { TaskModel };
