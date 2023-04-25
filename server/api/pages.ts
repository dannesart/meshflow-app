import { TPage, PAGE_STATUSES } from "~~/models/page";

export default defineEventHandler(async (e) => {
  const pages: TPage[] = [
    {
      id: "3424329daw",
      title: "Start page",
      status: PAGE_STATUSES[1],
      createdBy: "Daniel",
      created: new Date(),
      updatedBy: "Daniel",
      updated: new Date(),
      tags: [],
      blocks: [],
    },
  ];
  return pages;
});
