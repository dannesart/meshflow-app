import { ModelType } from "~~/models/model";

export const ModelTypes: ModelType[] = [
  {
    name: "Text",
    id: "text",
    description: "Titles, Names etc.",
    format: "string",
    icon: "text",
  },
  {
    name: "Rich text",
    id: "richText",
    description: "Paragraphs, larger texts etc.",
    format: "string",
    icon: "richText",
  },
  {
    name: "Boolean",
    id: "boolean",
    description: "On and off",
    format: "boolean",
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
  {
    name: "Media",
    id: "media",
    format: "media",
    description: "Link to a media",
    icon: "media",
  },
];
