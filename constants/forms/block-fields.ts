import { Form } from "~~/models/form";

export const blockFields: Form = {
  groups: [
    {
      inputs: [
        {
          type: "text",
          name: "name",
          label: "Name",
          disabled: false,
          value: "",
          values: [],
        },
        {
          type: "text",
          name: "id",
          label: "Id",
          disabled: true,
          value: "",
          values: [],
        },
      ],
    },
    {
      inputs: [
        {
          type: "text",
          name: "name",
          label: "Name",
          disabled: false,
          value: "",
          values: [],
        },
        {
          type: "text",
          name: "id",
          label: "Id",
          disabled: true,
          value: "",
          values: [],
        },
      ],
    },
  ],
};
