import { TASK_STATUSES, TTask } from "~~/models/task";

export default defineEventHandler(async (e) => {
  const tasks: TTask[] = [
    {
      title: "Ge anna rätt roll",
      description: "Hon ska ha admin",
      status: TASK_STATUSES[0],
      id: "3244324",
      created: new Date(),
      createdBy: "danne",
      tags: ["Role", "grejs"],
    },
    {
      title: "Skapa en nyhetskomponent",
      description: "Måste innehålla titel, beskriving och bild",
      status: TASK_STATUSES[1],
      id: "3424352",
      created: new Date("2022-12-17"),
      createdBy: "anna",
      tags: [],
    },
  ];
  return tasks;
});