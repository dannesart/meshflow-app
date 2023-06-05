import { ModelType } from "~~/models/model";

export const ModelTypes: ModelType[] = [
  {
    name: "Text",
    id: "text",
    description: "titles, names, paragraphs etc.",
    format: "string",
  },
  {
    name: "Boolean",
    id: "boolean",
    format: "string",
  },
  {
    name: "Number",
    id: "number",
    format: "number",
  },
  {
    name: "Date & time",
    id: "datetime",
    format: "date",
  },
];
