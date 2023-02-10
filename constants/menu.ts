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
        icon: "block",
        route: "/blocks",
        webOnly: true,
      },
      {
        label: "Pages",
        icon: "pages",
        route: "/pages",
        webOnly: true,
      },
      {
        label: "Data",
        icon: "data",
        route: "/data",
      },
      {
        label: "Models",
        icon: "model",
        route: "/models",
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
      {
        icon: "storage",
        label: "Storage",
        route: "/storage",
      },
    ],
  },
];
