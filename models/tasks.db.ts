import { model, Model, Schema } from "mongoose";
import { Task } from "./tasks";

const TaskDbSchema: Schema<Task> = new Schema({
  title: String,
  description: String,
  status: String,
  id: { type: String, unique: true },
  deadline: { type: Date },
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
  assignedTo: String,
  createdBy: String,
  estimate: String,
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
