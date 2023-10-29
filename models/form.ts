export type FormInput = {
  type: string;
  name: string;
  label: string;
  disabled: boolean;
  value: any;
  values: any[];
};

export type Group = {
  inputs: Array<FormInput>;
};

export type Form = {
  groups: Array<Group>;
};
