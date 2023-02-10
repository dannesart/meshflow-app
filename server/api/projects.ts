import { TProject } from "~~/models/project";

export default defineEventHandler(async (e) => {
  const projects: TProject[] = [
    {
      id: "3424329daw",
      name: "My test project",
    },
    {
      id: "2834adwaf7",
      name: "My other project",
    },
  ];
  return projects;
});
