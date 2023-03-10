const classes = [
  {
    name: "Display",
    type: "select",
    values: ["block", "flex", "flex flex-col", "inline-flex", "grid"],
  },
  {
    name: "Width",
    type: "range",
    values: ["none", "w-full", "w-1/2", "w-1/3", "w-1/4"],
  },
  {
    name: "Round",
    type: "radio",
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
    type: "range",
    values: ["none", "p-10", "p-5", "p-3", "p-1"],
  },
  {
    name: "Background",
    type: "color",
    values: ["none", "bg-white", "bg-green-400", "bg-purple-400", "bg-red-400"],
  },
];

export { classes };
