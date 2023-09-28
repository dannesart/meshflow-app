import { z } from "zod";
import { ModelField } from "~~/models/model";

export const fieldsToSchema = (fields: Array<ModelField>) => {
  const schema: { [key: string]: any } = {};
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    switch (field?.type.format) {
      case "string":
        schema[field.id] = z.string();
        break;
      case "number":
        schema[field.id] = z.number();
        break;
    }
  }
  return z.object(schema);
};

export const form = () => {};
