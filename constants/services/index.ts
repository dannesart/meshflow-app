import { DATA } from "./data";
import { PAGES } from "./pages";
import { BLOCKS } from "./blocks";
import { TService } from "~~/models/service";

const services = [BLOCKS.name, DATA.name, PAGES.name];

const getService = (service: string) => {
  switch (service) {
    case DATA.name:
      return DATA as TService;
    case BLOCKS.name:
      return BLOCKS as TService;
    case PAGES.name:
      return PAGES as TService;
    default:
      return {} as TService;
  }
};

export { DATA, PAGES, BLOCKS, getService, services };
