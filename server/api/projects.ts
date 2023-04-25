import { TProject, PROJECT_STATUSES, ProjectSchema } from "~~/models/project";

const mock: TProject[] = [
  {
    id: "3424329daw",
    name: "My test project",
    status: PROJECT_STATUSES[0],
    createdBy: "Daniel",
    created: new Date(),
    updatedBy: "Daniel",
    updated: new Date(),
  },
  {
    id: "2834adwaf7",
    name: "My other project",
    status: PROJECT_STATUSES[0],
    createdBy: "Daniel",
    created: new Date(),
    updatedBy: "Daniel",
    updated: new Date(),
  },
];

const newProject = (name: string) => {
  const project = {
    id: Math.floor(Math.random() * 1000000) + "",
    name,
    status: PROJECT_STATUSES[0],
    createdBy: "Daniel",
    created: new Date(),
    updatedBy: "Daniel",
    updated: new Date(),
  };
  mock.push(project);
  return project;
};

export default defineEventHandler(async (e) => {
  const { req, res } = e.node;
  //const body = await readBody(e);
  // const valid = body
  //   ? await ProjectSchema.safeParse(newProject(body.name))
  //   : true;
  const valid = true;

  switch (req.method) {
    case "GET":
      return mock;
    case "POST":
      if (valid) {
        return "Thanks";
      }
      return false;
    default:
      return mock;
  }
});
