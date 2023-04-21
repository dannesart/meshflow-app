const classes = [
  {
    name: "Display",
    type: "radio",
    values: ["block", "flex", "flex flex-col", "inline-flex", "grid"],
    icon: "boxes",
  },
  {
    name: "Width",
    type: "radio",
    values: ["w-1/2", "w-full"],
    icon: "chevron-left-right",
  },
  {
    name: "Round",
    type: "radio",
    icon: "box",
    values: [
      "none",
      "rounded-sm",
      "rounded-md",
      "rounded-lg",
      "rounded-xl",
      "rounded-2xl",
      "rounded-full",
    ],
  },
  {
    name: "Padding",
    type: "radio",
    icon: "expand",
    values: ["none", "p-1", "p-3", "p-5", "p-10"],
  },
  {
    name: "Background",
    type: "bg-color",
    values: [],
  },
  {
    name: "Text",
    type: "text-color",
    values: [],
  },
];

export { classes };
