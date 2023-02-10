export type TModelNode = {
  [key: string]:
    | String
    | String[]
    | Number
    | Number[]
    | Boolean
    | Boolean[]
    | Date
    | Date[]
    | TModelNode
    | TModelNode[];
};

export type TModel = {
  name: String;
  type: string;
  structure: TModelNode;
  createdBy: string;
  created: Date;
  updated: Date;
  updatedBy: string;
};
