import { BLOCKS, DATA, PAGES } from "./services";

export const Menu = [
  {
    label: "",
    items: [
      {
        icon: "dashboard",
        label: "Dashboard",
        route: "/",
      },
    ],
  },
  {
    label: "Content",
    items: [
      {
        label: "Blocks",
        icon: BLOCKS.icon,
        route: BLOCKS.route,
        webOnly: BLOCKS.webOnly,
      },
      {
        label: "Pages",
        icon: PAGES.icon,
        route: PAGES.route,
        webOnly: PAGES.webOnly,
      },
      {
        label: "Data",
        icon: DATA.icon,
        route: DATA.route,
        webOnly: DATA.webOnly,
      },
      {
        icon: "storage",
        label: "Storage",
        route: "/storage",
      },
      {
        icon: "rocket",
        label: "Api's",
        route: "/apis",
      },
      {
        label: "Rules",
        icon: "hand",
        route: "/rules",
      },
    ],
  },
  {
    label: "Account",
    items: [
      {
        label: "Roles",
        icon: "role",
        route: "/roles",
      },
      {
        label: "Users",
        icon: "users",
        route: "/users",
      },
    ],
  },
  {
    label: "Other",
    items: [
      {
        icon: "settings",
        label: "Settings",
        route: "/settings",
      },
      {
        icon: "tasks",
        label: "Tasks",
        route: "/tasks",
      },
    ],
  },
];
