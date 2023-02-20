import { DATA } from "./data";
import { PAGES } from "./pages";
import { BLOCKS } from "./blocks";
import { TService } from "~~/models/service";

const getService = (service: string) => {
  switch (service) {
    case DATA.name:
      return DATA as TService;
    case BLOCKS.name:
      return BLOCKS as TService;
    case DATA.name:
      return DATA as TService;
    default:
      return {} as TService;
  }
};

export { DATA, PAGES, BLOCKS, getService };
