import { BLOCKS, DATA, PAGES } from "./services";

export const Menu = [
  // {
  //   label: "",
  //   items: [
  //     {
  //       icon: "dashboard",
  //       label: "Dashboard",
  //       route: "/",
  //     },
  //   ],
  // },
  {
    label: "Content",
    items: [
      {
        label: "Pages",
        icon: PAGES.icon,
        route: PAGES.route,
        isService: true,
      },
      {
        label: "Blocks",
        icon: BLOCKS.icon,
        route: BLOCKS.route,
        isService: true,
      },
      {
        label: "Data",
        icon: DATA.icon,
        route: DATA.route,
        isService: true,
      },
      {
        icon: "storage",
        label: "Storage",
        route: "/storage",
        isService: true,
      },
      {
        icon: "rocket",
        label: "Api",
        route: "/apis",
        isService: true,
      },
      {
        label: "Rules",
        icon: "hand",
        route: "/rules",
        isService: true,
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
        isService: false,
      },
      {
        label: "Users",
        icon: "users",
        route: "/users",
        isService: false,
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
        isService: false,
      },
      {
        icon: "tasks",
        label: "Board",
        route: "/board",
        isService: false,
      },
    ],
  },
];
