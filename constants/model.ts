import { ModelType } from "~~/models/model";

export const ModelTypes: ModelType[] = [
  {
    name: "Text",
    id: "text",
    description: "Titles, Names, Paragraphs etc.",
    format: "string",
    icon: "text",
  },
  {
    name: "Boolean",
    id: "boolean",
    description: "On and off",
    format: "string",
    icon: "boolean",
  },
  {
    name: "Number",
    id: "number",
    description: "Years, Amount etc",
    format: "number",
    icon: "number",
  },
  {
    name: "Date",
    id: "date",
    format: "date",
    description: "Created, Updated, Deleted etc",
    icon: "date",
  },
  {
    name: "Reference",
    id: "reference",
    format: "reference",
    description: "Link to another block",
    icon: "link",
  },
];
