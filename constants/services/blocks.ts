import { TUtil } from "~~/models/layer";

const utilities = <TUtil[]>[
  {
    name: "container",
    defaultClasses: "",
  },
  {
    name: "button",
    defaultClasses: "",
  },
];

const defaultUtility: TUtil = utilities[0];

import { TService } from "~~/models/service";

export const BLOCKS: TService = {
  name: "blocks",
  route: "/blocks",
  webOnly: true,
  icon: "block",
  hasCategory: true,
};

export { utilities, defaultUtility };
