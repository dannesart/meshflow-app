import { Schema, model } from "mongoose";
import { Invite } from "./invite";

// This is the DB schema. Based on project type
const InviteDbSchema: Schema<Invite> = new Schema({
  projectId: { type: Schema.Types.ObjectId, ref: "projects" },
  createdBy: String,
  created: { type: Date, default: Date.now },
  email: String,
});
const InviteDbModel = model("invite", InviteDbSchema);

export { InviteDbModel };
