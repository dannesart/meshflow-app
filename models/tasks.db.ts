import { model, Model, Schema } from "mongoose";
import { Task } from "./tasks";

const TaskDbSchema: Schema<Task> = new Schema({
  title: String,
  description: String,
  status: String,
  deadline: { type: Date },
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
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
